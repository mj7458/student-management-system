package com.studentManagementApp.controller;

import api.StudentsApi;
import com.studentManagementApp.mapper.MapperUtilImpl;
import com.studentManagementApp.service.StudentService;
import dto.StudentDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class StudentController implements StudentsApi {
    private final StudentService service;


    public StudentController(StudentService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<StudentDto> addStudent(StudentDto studentDto) {
        StudentDto student=service.addStudent(studentDto);
        log.info(student.toString());
        return ResponseEntity.ok(student);
    }

    @Override
    public ResponseEntity<Void> deleteStudent(Long id) {
        service.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> deleteStudents(List<Long> ids) {
        service.deleteStudents(ids);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> list = service.getAllStudents();
        log.info(list.toString());
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<StudentDto> getStudentByName(String name) {
        StudentDto student=service.getStudentByName(name);
        log.info(student.toString());
        return ResponseEntity.ok(student);
    }

}
