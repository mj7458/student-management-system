package com.studentManagementApp.service;

import com.studentManagementApp.entity.Student;
import com.studentManagementApp.mapper.MapperUtilImpl;
import com.studentManagementApp.repo.AttendanceRepository;
import com.studentManagementApp.repo.StudentRepository;
import dto.StudentDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class StudentService {
    private final StudentRepository repository;
    private final AttendanceRepository attendanceRepository;

    @Autowired
    private MapperUtilImpl mapperUtil;

    public StudentService(StudentRepository repository, AttendanceRepository attendanceRepository) {
        this.repository = repository;
        this.attendanceRepository = attendanceRepository;
    }

    public List<StudentDto> getAllStudents() {
        List<StudentDto> students = repository.findAll().stream().map(mapperUtil::toDto).toList();
        return students;
    }

    public StudentDto getStudentByName(String name) {
        return mapperUtil.toDto(repository.findByName(name));
    }

    public StudentDto addStudent(StudentDto student) {
        if (student.getEnrollDate() == null) {
            student.setEnrollDate(LocalDate.now());
        }
        return mapperUtil.toDto(repository.save(mapperUtil.toEntity(student)));
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public void deleteStudents(List<Long> ids) {
        for (long id : ids) {
            if(!attendanceRepository.findByStudentId(id).isEmpty()) {
                log.info("Deleting attendance records for student: {} ",attendanceRepository.findByStudentId(id));
                attendanceRepository.deleteAll(attendanceRepository.findByStudentId(id));
            }
            repository.deleteById(id);
        }
    }
}
