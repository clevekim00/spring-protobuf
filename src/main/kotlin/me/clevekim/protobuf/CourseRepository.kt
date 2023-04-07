package me.clevekim.protobuf

class CourseRepository(val courses: Map<Int, CDSDTraining.Course>) {
    init {

    }

    fun getCourse(id: Int): CDSDTraining.Course? {
        return courses!![id]
    }
}