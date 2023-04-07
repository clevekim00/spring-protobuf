package me.clevekim.protobuf

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.http.converter.HttpMessageConverter
import org.springframework.http.converter.protobuf.ProtobufHttpMessageConverter

import org.springframework.web.client.RestTemplate
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap


@SpringBootApplication
class ProtobufApplication {

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            runApplication<ProtobufApplication>(*args)
        }
    }

//    @Bean
//    fun restTemplate(): RestTemplate? {
//        return RestTemplate()
//    }

    @Bean
    fun protobufHttpMessageConverter(): ProtobufHttpMessageConverter? {
        return ProtobufHttpMessageConverter()
    }

    @Bean
    fun createTestCourses(): CourseRepository? {
        val courses: MutableMap<Int, CDSDTraining.Course> = HashMap()
        val course1: CDSDTraining.Course = CDSDTraining.Course.newBuilder().setId(1).setCourseName("REST with Spring").build()//.addAllStudent(createTestStudents()).build()
        val course2: CDSDTraining.Course = CDSDTraining.Course.newBuilder().setId(2).setCourseName("Learn Spring Security").build()//.addAllStudent(ArrayList()).build()
        courses[course1.id] = course1
        courses[course2.id] = course2
        return CourseRepository(courses)
    }

//    private fun createTestStudents(): List<Student?>? {
//        val phone1: Student.PhoneNumber = createPhone("123456", Student.PhoneType.MOBILE)
//        val student1: Student = createStudent(1, "John", "Doe", "john.doe@baeldung.com", listOf(phone1))
//        val phone2: Student.PhoneNumber = createPhone("234567", Student.PhoneType.LANDLINE)
//        val student2: Student = createStudent(2, "Richard", "Roe", "richard.roe@baeldung.com", listOf(phone2))
//        val phone3_1: Student.PhoneNumber = createPhone("345678", Student.PhoneType.MOBILE)
//        val phone3_2: Student.PhoneNumber = createPhone("456789", Student.PhoneType.LANDLINE)
//        val student3: Student = createStudent(3, "Jane", "Doe", "jane.doe@baeldung.com", listOf(phone3_1, phone3_2))
//        return Arrays.asList(student1, student2, student3)
//    }

//    private fun createStudent(id: Int, firstName: String, lastName: String, email: String, phones: List<Student.PhoneNumber>): Student {
//        return Student.newBuilder().setId(id).setFirstName(firstName).setLastName(lastName).setEmail(email).addAllPhone(phones).build()
//    }

//    private fun createPhone(number: String, type: Student.PhoneType): Student.PhoneNumber {
//        return Student.PhoneNumber.newBuilder().setNumber(number).setType(type).build()
//    }
}