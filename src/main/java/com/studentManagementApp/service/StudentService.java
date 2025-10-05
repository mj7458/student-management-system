package com.studentManagementApp.service;

import com.studentManagementApp.entity.Student;
import com.studentManagementApp.mapper.MapperUtilImpl;
import com.studentManagementApp.repo.StudentRepository;
import dto.StudentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository repository;

    @Autowired
    private MapperUtilImpl mapperUtil;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<StudentDto> getAllStudents() {
        List<StudentDto> students = repository.findAll().stream().map(mapperUtil::toDto).toList();
        return students;
    }

    public StudentDto getStudentByName(String name) {
        return mapperUtil.toDto(repository.findByName(name));
    }

    public StudentDto addStudent(StudentDto student) {
//        if(repository.findByName(student.getName()) != null){
        return mapperUtil.toDto(repository.save(mapperUtil.toEntity(student)));
//        }
//        return repository.findByName(student.getName());
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public void deleteStudents(List<Long> ids) {
        for (long id : ids) {
            repository.deleteById(id);
        }
    }
}
