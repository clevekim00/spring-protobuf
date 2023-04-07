import React, { useState } from "react";
import axios from "axios"
// import {protobuf} from "protobufjs";
// import { Student } from "./protobuf/student";
import {Course} from "./protobuf/sample_pb";
function AxiosApi() {

    // photos, setPhotos 비구조화 할당
    let [course, setCourse] = useState(null);

    // 통신 메서드
    function searchApi() {
        /*
        protobuuf message 생성 sample
        let course = new Course()
        course.setId(2)
        course.setCourseName("Test")
        let courseBytes = course.serializeBinary()
        console.log(courseBytes)
        let deCourse = Course.deserializeBinary(courseBytes)
        console.log(deCourse)
        */
        const url = "/courses/1";
        // axios.defaults.headers.get['Content-Type'] = 'application/x-protobuf';
        axios.get(url, {
                headers:{
                    'Accept': 'application/x-protobuf',
                    'MediaType': 'application/x-protobuf',
                    // 'Content-Type': 'application/x-protobuf',
                },
                // protobuf message를 제대로 받을려면 responseType을 지정해야함.
                // `responseType` indicates the type of data that the server will respond with
                // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
                // https://axios-http.com/docs/req_config
                responseType: "arraybuffer",
            })
            .then(function(response) {
                console.log('response', response)
                console.log('response.data', response.data)
                console.log('response.data type', typeof response.data)
                // setPhotos(response.data)
                let bytes = new Uint8Array(response.data);
                console.log('bytes', bytes)
                let sample = Course.deserializeBinary(bytes)
                console.log("성공");
                console.log('sample', sample)
                setCourse(sample)
            })
            .catch(function(error) {
                console.log("실패", error);
                course = null
            })
    }

    function sendApi() {
        const url = '/courses'
        let course = new Course()
        course.setId(2)
        course.setCourseName("Test")
        let courseBytes = course.serializeBinary()

        axios.post(
            url,
            courseBytes,
            {
                headers: {
                    'Accept': 'application/x-protobuf',
                    'MediaType': 'application/x-protobuf',
                    'Content-Type': 'application/x-protobuf',
                },
                // protobuf message를 제대로 받을려면 responseType을 지정해야함.
                // `responseType` indicates the type of data that the server will respond with
                // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
                // https://axios-http.com/docs/req_config
                responseType: "arraybuffer",
            }
        )
        .then(function(response) {
            console.log("성공");
            console.log('response', response)
            console.log('response.data', response.data)
            console.log('response.data type', typeof response.data)
            let bytes = new Uint8Array(response.data);
            console.log('bytes', bytes)
            let sample = Course.deserializeBinary(bytes)
            console.log("성공");
            console.log('sample', sample)
            setCourse(sample)
        })
        .catch(function(error) {
            console.log("실패", error);
        })
    }

    // 조회 데이터 존재할 경우
    if(course !== null) {
        return (
            <div>
                <div>id:{course.id} / {course.getId()}</div>
                <div>courseName:{course.courseName} / {course.getCourseName()}</div>
                <div>
                    <button onClick={searchApi}> 다시 불러오기 </button>
                </div>
                <div>
                    <button onClick={sendApi}> Submit </button>
                </div>
            </div>
        );
    } else { // 조회 데이터 존재하지 않을 경우
        return (
            <div>
                <button onClick={searchApi}> 불러오기 </button>
            </div>
        )
    }
}
export default AxiosApi;