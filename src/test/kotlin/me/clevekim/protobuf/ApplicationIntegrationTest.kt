package me.clevekim.protobuf

import org.hamcrest.CoreMatchers.containsString
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter
import org.springframework.web.client.RestTemplate
import java.util.Arrays.*

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ApplicationIntegrationTest {

    @LocalServerPort
    private val port = 0

    @Test
    fun whenUsingRestTemplate_thenSucceed() {

//        val headers = HttpHeaders()
//        headers.set("Content-Type", "application/x-protobuf")
//
//        val course: ResponseEntity<Course> = restTemplate.getForEntity(getUrl(), Course::class.java)
//        val url = getUrl()//"https://jsonplaceholder.typicode.com/posts/{id}"
//        val headers = HttpHeaders()
//        headers.contentType = MediaType.APPLICATION_PROTOBUF
//        headers.accept = Collections.singletonList(MediaType.APPLICATION_PROTOBUF)
//        val request: HttpEntity<*> = HttpEntity<Any?>(headers)
//        val response = restTemplate.exchange(
//            url,
//            HttpMethod.GET,
//            request,
//            Course::class.java,
//            1 // uri 파라미터 값
//        )
        val restTemplate: RestTemplate = RestTemplate()
        restTemplate.messageConverters = asList(ProtobufHttpMessageConverter()) as List<HttpMessageConverter<*>>

        val headers = HttpHeaders()
//        headers.accept = asList(MediaType.APPLICATION_PROTOBUF)
//        headers.set("Content-Type", MediaType.APPLICATION_PROTOBUF_VALUE)
        headers.set("MediaType", MediaType.APPLICATION_PROTOBUF_VALUE)
        val entity = HttpEntity<String>(headers)

        val response: ResponseEntity<CDSDTraining.Course> = restTemplate.exchange(
            getUrl(),
            HttpMethod.GET,
            entity,
            CDSDTraining.Course::class.java, "1"
        )
        val resource: CDSDTraining.Course? = response.getBody()
        Assertions.assertNotNull(resource!!.courseName)
        println(resource)
        println(resource.courseName)
    }

//    @Test
//    fun kryoTest() {
//
//        val restTemplate: RestTemplate = RestTemplate()
//        restTemplate.messageConverters = asList(KryoHttpMessageConverter()) as List<HttpMessageConverter<*>>
//
//        val headers = HttpHeaders()
////        headers.accept = asList(MediaType.APPLICATION_PROTOBUF)
////        headers.set("Content-Type", MediaType.APPLICATION_PROTOBUF_VALUE)
//        headers.set("MediaType", "application/x-kryo")
//        headers.accept = listOf(KryoHttpMessageConverterKt.KRYO);
//        val entity = HttpEntity<String>(headers)
//
//        val response: ResponseEntity<CDSDTraining.Course> = restTemplate.exchange(
//            getUrlKryo(),
//            HttpMethod.GET,
//            entity,
//            CDSDTraining.Course::class.java, "1"
//        )
//        Assertions.assertNotNull(response)
//        val resource = response.getBody()
//        Assertions.assertNotNull(resource)
//        Assertions.assertNotNull(resource!!.courseName)
//        println(resource)
//        println(resource.courseName)
//    }

    private fun assertResponse(response: String) {
        assertThat(response, containsString("id"))
        assertThat(response, containsString("course_name"))
        assertThat(response, containsString("REST with Spring"))
        assertThat(response, containsString("student"))
        assertThat(response, containsString("first_name"))
        assertThat(response, containsString("last_name"))
        assertThat(response, containsString("email"))
        assertThat(response, containsString("john.doe@baeldung.com"))
        assertThat(response, containsString("richard.roe@baeldung.com"))
        assertThat(response, containsString("jane.doe@baeldung.com"))
        assertThat(response, containsString("phone"))
        assertThat(response, containsString("number"))
        assertThat(response, containsString("type"))
    }

    fun getUrl(): String {
        return "http://localhost:$port/courses/{id}"
    }
    fun getUrlKryo(): String {
        return "http://localhost:$port/courses/kryo/{id}"
    }

}