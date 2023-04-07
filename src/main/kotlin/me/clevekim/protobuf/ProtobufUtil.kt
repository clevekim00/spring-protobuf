package me.clevekim.protobuf

import com.google.protobuf.AbstractMessage
import com.google.protobuf.AbstractMessage.Builder
import com.google.protobuf.Message
import com.google.protobuf.MessageOrBuilder
import com.google.protobuf.Struct
import com.google.protobuf.util.JsonFormat
import java.io.IOException

class ProtobufUtil {


    companion object {
        @JvmStatic
        @Throws(IOException::class)
        fun toJson(messageOrBuilder: MessageOrBuilder?): String? {
            return JsonFormat.printer().print(messageOrBuilder)
        }

        @JvmStatic
        @Throws(IOException::class)
        fun fromJson(json: String?): Message? {
            val structBuilder = Struct.newBuilder()
            JsonFormat.parser().ignoringUnknownFields().merge(json, structBuilder)
            return structBuilder.build()
        }
    }
}