package com.studentManagementApp.controller;

import com.studentManagementApp.mapper.StudentMapper;
import com.studentManagementApp.service.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.openapitools.api.StudentsApi;
import org.openapitools.model.StudentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class StudentController implements StudentsApi {
    private final StudentService service;

    @Autowired
    private StudentMapper studentMapper;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<StudentDto> addStudent(StudentDto studentDto) {
        return ResponseEntity.ok(service.addStudent(studentMapper.toEntity(studentDto)));
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
        return ResponseEntity.ok(studentMapper.toDto(service.getStudentByName(name)));
    }

}
