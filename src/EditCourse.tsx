import { TextField, Button, Chip, Paper, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  name: string;
}

interface Course {
  courseId: string;
  courseName: string;
  students: Student[];
  tags: string[];
}

const EditCourse = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, watch } = useForm();
  const [coursesResponse, coursesLoading] = useFetch<{ courses: Course[] }>(
    "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json"
  );
  const [studentsResponse, studentsLoading] = useFetch<{
    enrolledList: Student[];
  }>(
    "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json"
  );
  const [tagsResponse, tagsLoading] = useFetch<{ tags: string[] }>(
    "https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json"
  );
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const courses = coursesResponse?.courses || [];
  const enrolledStudents = studentsResponse?.enrolledList || [];
  const tags = tagsResponse?.tags || [];

  useEffect(() => {
    if (selectedCourseId) {
      const selectedCourse = courses.find(
        (course) => course.courseId === selectedCourseId
      );
      if (selectedCourse) {
        setSelectedStudents(selectedCourse.students);
        setSelectedTags(selectedCourse.tags);
      }
    }
  }, [selectedCourseId, courses]);

  const onSubmit = (data: any) => {
    if (selectedCourseId) {
      const updatedCourse = courses.find(
        (course) => course.courseId === selectedCourseId
      );
      if (updatedCourse) {
        updatedCourse.students = selectedStudents;
        updatedCourse.tags = selectedTags;
        console.log(updatedCourse);
      }
      navigate("/");
    }
  };

  return (
    <Paper>
    <h2>Edit Couse Details</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="courseName"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={courses.map((course) => ({
              ...course,
              key: course.courseId, 
            }))}
            getOptionLabel={(option) =>
              option.courseId + " " + option.courseName
            }
            renderInput={(params) => (
              <TextField {...params} label="Course Name" />
            )}
            onChange={(e, newValue) => {
              field.onChange(newValue);
              setSelectedCourseId(newValue ? newValue.courseId : null);
              setSelectedStudents([]); 
              setSelectedTags([]); 
            }}
          />
        )}
      />
      <Controller
        name="enrolledStudents"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            options={enrolledStudents}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Enrolled Students" />
            )}
            value={selectedStudents}
            onChange={(e, newValue) => setSelectedStudents(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            options={tags}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label="Tags" />}
            value={selectedTags}
            onChange={(e, newValue) => setSelectedTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  
    </Paper>
  );
};

export default EditCourse;
