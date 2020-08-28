import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.layers import Dense, Input, concatenate, Dropout
from tensorflow.keras import backend as K
from tensorflow.keras.models import Model


class MultiHeadSelfAttention(layers.Layer):
    def __init__(self, embed_dim, num_heads=8):
        super(MultiHeadSelfAttention, self).__init__()
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        if embed_dim % num_heads != 0:
            raise ValueError(
                f"embedding dimension = {embed_dim} should be divisible by number of heads = {num_heads}"
            )
        self.projection_dim = embed_dim // num_heads
        self.query_dense = layers.Dense(embed_dim)
        self.key_dense = layers.Dense(embed_dim)
        self.value_dense = layers.Dense(embed_dim)
        self.combine_heads = layers.Dense(embed_dim)

    def attention(self, query, key, value):
        score = tf.matmul(query, key, transpose_b=True)
        dim_key = tf.cast(tf.shape(key)[-1], tf.float32)
        scaled_score = score / tf.math.sqrt(dim_key)
        weights = tf.nn.softmax(scaled_score, axis=-1)
        output = tf.matmul(weights, value)
        return output, weights

    def separate_heads(self, x, batch_size):
        x = tf.reshape(x, (batch_size, -1, self.num_heads, self.projection_dim))
        return tf.transpose(x, perm=[0, 2, 1, 3])

    def call(self, inputs):
        # x.shape = [batch_size, seq_len, embedding_dim]
        batch_size = tf.shape(inputs)[0]
        query = self.query_dense(inputs)  # (batch_size, seq_len, embed_dim)
        key = self.key_dense(inputs)  # (batch_size, seq_len, embed_dim)
        value = self.value_dense(inputs)  # (batch_size, seq_len, embed_dim)
        query = self.separate_heads(
            query, batch_size
        )  # (batch_size, num_heads, seq_len, projection_dim)
        key = self.separate_heads(
            key, batch_size
        )  # (batch_size, num_heads, seq_len, projection_dim)
        value = self.separate_heads(
            value, batch_size
        )  # (batch_size, num_heads, seq_len, projection_dim)
        attention, weights = self.attention(query, key, value)
        attention = tf.transpose(
            attention, perm=[0, 2, 1, 3]
        )  # (batch_size, seq_len, num_heads, projection_dim)
        concat_attention = tf.reshape(
            attention, (batch_size, -1, self.embed_dim)
        )  # (batch_size, seq_len, embed_dim)
        output = self.combine_heads(
            concat_attention
        )  # (batch_size, seq_len, embed_dim)
        return output


class TransformerBlock(layers.Layer):
    def __init__(self, embed_dim, num_heads, ff_dim, rate=0.1):
        super(TransformerBlock, self).__init__()
        self.att = MultiHeadSelfAttention(embed_dim, num_heads)
        self.ffn = keras.Sequential(
            [layers.Dense(ff_dim, activation="relu"), layers.Dense(embed_dim),]
        )
        self.layernorm1 = layers.LayerNormalization(epsilon=1e-6)
        self.layernorm2 = layers.LayerNormalization(epsilon=1e-6)
        self.dropout1 = layers.Dropout(rate)
        self.dropout2 = layers.Dropout(rate)

    def call(self, inputs, training):
        attn_output = self.att(inputs)
        attn_output = self.dropout1(attn_output, training=training)
        out1 = self.layernorm1(inputs + attn_output)
        ffn_output = self.ffn(out1)
        ffn_output = self.dropout2(ffn_output, training=training)
        return self.layernorm2(out1 + ffn_output)


class TokenEmbedding(layers.Layer):
    def __init__(self, maxlen, vocab_size, embed_dim):
        super(TokenEmbedding, self).__init__()
        self.token_emb = layers.Embedding(input_dim=vocab_size, output_dim=embed_dim)

    def call(self, x):
        return self.token_emb(x)

embed_dim = 32  # Embedding size for each token
num_heads = 2  # Number of attention heads
ff_dim = 32  # Hidden layer size in feed forward network inside transformer
vocab_size_maps = 11857
vocab_size_proc = 2010
vocab_size_med = 2451

def compile_model():
    # For Metamap
    inputs = layers.Input(shape=(50,))
    embedding_layer = TokenEmbedding(50, vocab_size_maps, embed_dim)
    x = embedding_layer(inputs)
    transformer_block = TransformerBlock(embed_dim, num_heads, ff_dim)
    x = transformer_block(x)
    x = layers.GlobalAveragePooling1D()(x)
    x = layers.Dropout(0.1)(x)
    x = layers.Dense(20, activation="relu")(x)
    x = Model(inputs=inputs, outputs=x)

    # For procedures
    inputs2 = layers.Input(shape=(8,))
    embedding_layer2 = TokenEmbedding(8, vocab_size_proc, embed_dim)
    x2 = embedding_layer2(inputs2)
    transformer_block2 = TransformerBlock(embed_dim, num_heads, ff_dim)
    x2 = transformer_block2(x2)
    x2 = layers.GlobalAveragePooling1D()(x2)
    x2 = layers.Dropout(0.1)(x2)
    x2 = layers.Dense(20, activation="relu")(x2)
    x2 = Model(inputs=inputs2, outputs=x2)

    # For medications
    inputs4 = layers.Input(shape=(35,))
    embedding_layer4 = TokenEmbedding(35, vocab_size_med, embed_dim)
    x4 = embedding_layer4(inputs4)
    transformer_block4 = TransformerBlock(embed_dim, num_heads, ff_dim)
    x4 = transformer_block4(x4)
    x4 = layers.GlobalAveragePooling1D()(x4)
    x4 = layers.Dropout(0.1)(x4)
    x4 = layers.Dense(20, activation="relu")(x4)
    x4 = Model(inputs=inputs4, outputs=x4)

    #for lab results
    input_lab = Input(shape =(52,))
    x3 = Dense(50,activation='relu')(input_lab)
    x3 = layers.Dropout(0.2)(x3)
    x3 = Dense(40,activation='relu')(x3)
    x3 = Model(inputs=input_lab, outputs=x3)

    merged = concatenate([x.output, x2.output])
    merged3 = concatenate([merged, x4.output])
    merged2 = concatenate([merged3, x3.output])

    out = Dense(64, activation='relu')(merged2) 
    out = layers.Dropout(0.1)(out)
    out = Dense(1, activation='sigmoid')(out)

    distron = Model(inputs=[x.input, x2.input, x4.input, x3.input], outputs=out)

    distron.compile("adam", "binary_crossentropy", metrics=["accuracy"])

    return distron