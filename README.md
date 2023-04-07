# spring-protobuf
spring boot with protobuf

# Guide
https://blog.naver.com/clevekim/223067801243

# Protobuf 란?

Protocol Buffers, 또는 protobuf는 구조화된 데이터를 직렬화하고, 다른 언어로 쉽게 전송하고, 역직렬화할 수 있도록 Google에서 만든 언어 중립적, 효율적인 데이터 직렬화 포맷입니다.

[https://protobuf.dev/](https://protobuf.dev/)

## Protobuf 장점

* 경량
    * json, xml 보다 훨씬 작은 데이터를 사용
* 객체형태로 사용이 가능하다
    * 문자열로 파싱한 데이터를 꺼내올 경우 발생가능한 오타에 의한 실수를 원천에 방지할 수 있다

# Protobuf 구현

## Enviroment

- Spring boot 3
    - kotlin
- React
    - javascript or typescript
- Protobuf 3

![image](https://user-images.githubusercontent.com/2428761/230589266-d6cef9da-7c3d-4d71-b6dd-62bf1f156d25.png)


## Setup

먼저 protobuf를 컴파일 하기위해 protoc를 설치해야 한다.

install protoc

```json
brew install protoc
```

### Protobuf compile

```json
// java, kotlin
protoc --proto_path=src --java_out=src/main/java --kotlin_out=src/main/kotlin src/main/resources/sample.proto

// javascript
protoc --js_out=import_style=commonjs,binary:. src/main/resources/sample.proto
```

## Protobuf Message

```json
syntax = "proto3";

package sample;

option java_multiple_files = false;
option java_package = "me.clevekim.protobuf";
option java_outer_classname = "Sample";

message Course {
	int32 id = 1;
	string course_name = 2;
}
```

## Backend

### Depedence 추가

```json
dependencies {
    // for protobuf
    implementation("com.google.protobuf:protobuf-java:3.22.2")
    implementation("com.google.protobuf:protobuf-java-util:3.22.2")
    implementation("com.google.protobuf:protobuf-kotlin:3.22.2")
}
```

### HttpMessageConverter

Protobuf message를 다루기 위해 HttpMessageConverter에 Google에서 제공하는 ProtobufHttpMessageConverter를 설정해야 한다.

```kotlin
@Bean
fun addProtobufHttpMessageConveter(): ProtobufHttpMessageConverter {
    return ProtobufHttpMessageConverter()
}
```

### Controller

```kotlin
@RestController
class CourseController(@Autowired val courseRepo: CourseRepository) {

    @GetMapping(value = ["/courses/{id}"], produces = [MediaType.APPLICATION_PROTOBUF_VALUE])
    @ResponseBody
    fun customer(@PathVariable id: Int): CDSDTraining.Course? {
        val course = courseRepo.getCourse(id)
        return course
    }

    @PostMapping(value = ["/courses"], consumes = [MediaType.APPLICATION_PROTOBUF_VALUE], produces = [MediaType.APPLICATION_PROTOBUF_VALUE])
    @ResponseBody
    fun coursePost(@RequestBody course: Course?): CDSDTraining.Course? {
        return course
    }
}
```

- produces에 MediaType.APPLICATION_PROTOBUF_VALUE를 추가하면 response가 ProtobufHttpMessageConverter를 거쳐서 protobuf message가 serialize되어 나간다
- consumes에 MediaType.APPLICATION_PROTOBUF_VALUE를 추가하면 request가 ProtobufHttpMessageConverter를 거쳐서 전달되며 이때 request의 protobuf message가 deserialize되어 요청된다.

## Frontend

### library install

```kotlin
// google-protobuf
npm install google-protobuf

// axios
npm install axios
```

### React app create

```kotlin
npx create-react-app webapp
```

### Protobuf message GET

```jsx
function searchApi() {
        const url = "/courses/1";
        axios.get(url, {
                headers:{
                    'Accept': 'application/x-protobuf',
                    'MediaType': 'application/x-protobuf',
                },
                // protobuf message를 제대로 받을려면 responseType을 지정해야함.
                // `responseType` indicates the type of data that the server will respond with
                // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
                // https://axios-http.com/docs/req_config
                responseType: "arraybuffer",
            })
            .then(function(response) {
                console.log("성공");
                let bytes = new Uint8Array(response.data);
                let sample = Course.deserializeBinary(bytes)
                setCourse(sample)
            })
            .catch(function(error) {
                console.log("실패", error);
                course = null
            })
    }
```

### Protobuf message POST

```jsx
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
            let bytes = new Uint8Array(response.data);
            let sample = Course.deserializeBinary(bytes)
            setCourse(sample)
        })
        .catch(function(error) {
            console.log("실패", error);
        })
    }
```

### App.js

```jsx
import React, { useState } from "react";
import axios from "axios"
import {Course} from "./protobuf/sample_pb";
function AxiosApi() {

    // photos, setPhotos 비구조화 할당
    let [course, setCourse] = useState(null);

    // 통신 메서드
    function searchApi() {
        const url = "/courses/1";
        axios.get(url, {
                headers:{
                    'Accept': 'application/x-protobuf',
                    'MediaType': 'application/x-protobuf',
                    // 'Content-Type': 'application/x-protobuf',
                },
                responseType: "arraybuffer",
            })
            .then(function(response) {
                let bytes = new Uint8Array(response.data);
                let sample = Course.deserializeBinary(bytes)
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
                responseType: "arraybuffer",
            }
        )
        .then(function(response) {
            let bytes = new Uint8Array(response.data);
            let sample = Course.deserializeBinary(bytes)
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
```
