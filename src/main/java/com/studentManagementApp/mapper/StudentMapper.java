package com.studentManagementApp.mapper;

import com.studentManagementApp.entity.Student;
import org.openapitools.model.StudentDto;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {

    public Student toEntity(StudentDto dto) {
        if (dto == null) {
            return null;
        }

        Student student = new Student();
        student.setAge(dto.getAge());
        student.setId(dto.getId());
        student.setName(dto.getName());
        student.setCourse(dto.getCourse());
        student.setEnrollDate(dto.getEnrollDate());

        return student;
    }

    public StudentDto toDto(Student entity) {
        if (entity == null) {
            return null;
        }

        StudentDto studentDto = new StudentDto();
        studentDto.setAge(entity.getAge());
        studentDto.setId(entity.getId());
        studentDto.setName(entity.getName());
        studentDto.setCourse(entity.getCourse());
        studentDto.setEnrollDate(entity.getEnrollDate());


        return studentDto;
    }

}
