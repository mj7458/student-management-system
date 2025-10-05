package com.studentManagementApp.mapper;

import com.studentManagementApp.entity.Attendance;
//import org.openapitools.model.AttendanceDto;
import dto.AttendanceDto;
import org.springframework.stereotype.Component;

@Component
public class AttendanceMapper {

    public Attendance toEntity(AttendanceDto dto) {
        if (dto == null) {
            return null;
        }

        Attendance attendance = new Attendance();
        attendance.setId(dto.getId());
        attendance.setStatus(dto.getStatus().getValue());
        attendance.setDate(dto.getDate());
        attendance.setStudentId(dto.getStudentId());

        return attendance;
    }

    public AttendanceDto toDto(Attendance entity) {
        if (entity == null) {
            return null;
        }

        AttendanceDto dto = new AttendanceDto();
        dto.setId(entity.getId());
        dto.setStatus(entity.getStatus() != null ? AttendanceDto.StatusEnum.fromValue(entity.getStatus()) : null);
        dto.setDate(entity.getDate());
        dto.setStudentId(entity.getStudentId());


        return dto;
    }
}
