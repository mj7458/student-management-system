package com.studentManagementApp.mapper;

import com.studentManagementApp.entity.Attendance;
import com.studentManagementApp.entity.Student;
import com.studentManagementApp.entity.StudentDetails;
import com.studentManagementApp.entity.User;
import dto.AttendanceDto;
import dto.StudentDetailsDto;
import dto.StudentDto;
import dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MapperUtil {
    Student toEntity(StudentDto dto);
    StudentDto toDto(Student entity);
    Attendance toEntity(AttendanceDto dto);
    AttendanceDto toDto(Attendance entity);
    User toEntity(UserDto dto);
    UserDto toDto(User entity);
    StudentDetails toEntity(StudentDetailsDto dto);
    StudentDetailsDto toDto(StudentDetails entity);

}
