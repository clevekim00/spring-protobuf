package me.clevekim.protobuf

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import java.io.IOException

class ProtobufUtilUnitTest {
    var jsonStr = """{
  "boolean": true,
  "color": "gold",
  "object": {
    "a": "b",
    "c": "d"
  },
  "string": "Hello World"
}"""

    @Test
    @Throws(IOException::class)
    fun givenJson_convertToProtobuf() {
        val protobuf = ProtobufUtil.fromJson(jsonStr)
        Assertions.assertTrue(protobuf.toString().contains("key: \"boolean\""))
        Assertions.assertTrue(protobuf.toString().contains("string_value: \"Hello World\""))
    }

    @Test
    @Throws(IOException::class)
    fun givenProtobuf_convertToJson() {
        val protobuf = ProtobufUtil.fromJson(jsonStr)
        val json     = ProtobufUtil.toJson(protobuf)
        Assertions.assertNotNull(json)
        json?.let {
            Assertions.assertTrue(it.contains("\"boolean\": true"))
            Assertions.assertTrue(it.contains("\"string\": \"Hello World\""))
            Assertions.assertTrue(it.contains("\"color\": \"gold\""))
        }
    }
}