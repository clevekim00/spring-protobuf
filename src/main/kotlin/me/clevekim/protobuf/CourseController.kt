package me.clevekim.protobuf

import me.clevekim.protobuf.CDSDTraining.Course
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController


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