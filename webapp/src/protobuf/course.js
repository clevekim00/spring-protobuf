// source: src/main/resources/sample.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.me.clevekim.protobuf.Course');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.me.clevekim.protobuf.Student');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.me.clevekim.protobuf.Course = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.me.clevekim.protobuf.Course.repeatedFields_, null);
};
goog.inherits(proto.me.clevekim.protobuf.Course, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.me.clevekim.protobuf.Course.displayName = 'proto.me.clevekim.protobuf.Course';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.me.clevekim.protobuf.Course.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.me.clevekim.protobuf.Course.prototype.toObject = function(opt_includeInstance) {
  return proto.me.clevekim.protobuf.Course.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.me.clevekim.protobuf.Course} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.me.clevekim.protobuf.Course.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    courseName: jspb.Message.getFieldWithDefault(msg, 2, ""),
    studentList: jspb.Message.toObjectList(msg.getStudentList(),
    proto.me.clevekim.protobuf.Student.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.me.clevekim.protobuf.Course}
 */
proto.me.clevekim.protobuf.Course.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.me.clevekim.protobuf.Course;
  return proto.me.clevekim.protobuf.Course.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.me.clevekim.protobuf.Course} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.me.clevekim.protobuf.Course}
 */
proto.me.clevekim.protobuf.Course.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCourseName(value);
      break;
    case 3:
      var value = new proto.me.clevekim.protobuf.Student;
      reader.readMessage(value,proto.me.clevekim.protobuf.Student.deserializeBinaryFromReader);
      msg.addStudent(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.me.clevekim.protobuf.Course.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.me.clevekim.protobuf.Course.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.me.clevekim.protobuf.Course} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.me.clevekim.protobuf.Course.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getCourseName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getStudentList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.me.clevekim.protobuf.Student.serializeBinaryToWriter
    );
  }
};


/**
 * optional int32 id = 1;
 * @return {number}
 */
proto.me.clevekim.protobuf.Course.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.me.clevekim.protobuf.Course} returns this
 */
proto.me.clevekim.protobuf.Course.prototype.setId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string course_name = 2;
 * @return {string}
 */
proto.me.clevekim.protobuf.Course.prototype.getCourseName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.me.clevekim.protobuf.Course} returns this
 */
proto.me.clevekim.protobuf.Course.prototype.setCourseName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated Student student = 3;
 * @return {!Array<!proto.me.clevekim.protobuf.Student>}
 */
proto.me.clevekim.protobuf.Course.prototype.getStudentList = function() {
  return /** @type{!Array<!proto.me.clevekim.protobuf.Student>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.me.clevekim.protobuf.Student, 3));
};


/**
 * @param {!Array<!proto.me.clevekim.protobuf.Student>} value
 * @return {!proto.me.clevekim.protobuf.Course} returns this
*/
proto.me.clevekim.protobuf.Course.prototype.setStudentList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.me.clevekim.protobuf.Student=} opt_value
 * @param {number=} opt_index
 * @return {!proto.me.clevekim.protobuf.Student}
 */
proto.me.clevekim.protobuf.Course.prototype.addStudent = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.me.clevekim.protobuf.Student, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.me.clevekim.protobuf.Course} returns this
 */
proto.me.clevekim.protobuf.Course.prototype.clearStudentList = function() {
  return this.setStudentList([]);
};

