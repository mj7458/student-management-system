package com.studentManagementApp.controller;

import com.studentManagementApp.entity.Attendance;
import com.studentManagementApp.service.AttendanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200/")
@Slf4j
@RestController
@RequestMapping("/attendance")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/{studentId}")
    public List<Attendance> getAttendance(
            @PathVariable Long studentId,
            @RequestParam int year,
            @RequestParam int month
    ) {
        return attendanceService.getAttendanceForStudent(studentId, year, month);
    }

    @PostMapping("/save")
    public List<Attendance> saveAttendance (@RequestBody List<Attendance> attendanceList){
        return attendanceService.markAttendance(attendanceList);
    }

}
