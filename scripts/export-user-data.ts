/* eslint-disable no-await-in-loop */
import { semestersCollection } from './firebase-config';
import fs from 'fs';

class Rating {
  userId: number;
  courseId: number;
  rating: number;
  timestamp: number;
  constructor(id: number, course: number, rating: 1, timestamp: 0) {
    this.userId = id;
    this.courseId = course;
    this.rating = rating;
    this.timestamp = timestamp;
  }
  saveAsCSV() {
    const csv = `${this.userId},${this.courseId},${this.rating},${this.timestamp}\n`;
    try {
      fs.appendFileSync('src/rec-sys/ratings.csv', csv);
    } catch (err) {
      console.error(err);
    }
  }
}

function getUserCourses(
  user: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): number[] {
  let userCourseIDs: number[] = [];
  const semesters = user.get('semesters');
  for (const semester of semesters) {
    const courses = semester.courses;
    for (const course of courses) {
      userCourseIDs.push(course.crseId);
    }
  }
  return userCourseIDs;
}

function createCSVHeaders() {
  const csv = 'userID,itemID,rating,timestamp\n';
  try {
    fs.appendFileSync('src/rec-sys/ratings.csv', csv);
  } catch (err) {
    console.error(err);
  }
}
const exportUserData = async () => {
  const userSnapshot = await semestersCollection.get();
  createCSVHeaders();
  for (const user of userSnapshot.docs) {
    let courses = getUserCourses(user);
    let id = user.get('id');
    if (id == undefined) {
      continue;
    }
    for (const course of courses) {
      if (course == undefined) {
        continue;
      }
      let rating = new Rating(id, course, 1, 0);
      rating.saveAsCSV();
    }
  }
};

exportUserData();
