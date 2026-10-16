// ============================================
// STUDENT DATA
// ============================================

let students =
    JSON.parse(localStorage.getItem("students")) || [];

let editingIndex = null;


// ============================================
// PAGE LOAD
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    setDate();

    displayStudents();

});


// ============================================
// CURRENT DATE
// ============================================

function setDate() {

    const dateElement =
        document.getElementById("currentDate");

    const today = new Date();

    const options = {
        day: "2-digit",
        month: "short",
        year: "numeric"
    };

    dateElement.innerText =
        today.toLocaleDateString("en-IN", options);
}


// ============================================
// ADD STUDENT
// ============================================

document
    .getElementById("studentForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("studentName")
                .value
                .trim();


        const roll =
            document
                .getElementById("rollNo")
                .value
                .trim();


        const course =
            document
                .getElementById("course")
                .value;


        const marks =
            Number(
                document
                    .getElementById("marks")
                    .value
            );


        // Validation

        if (!name || !roll || !course) {

            alert("Please fill all required fields.");

            return;
        }


        if (marks < 0 || marks > 100) {

            alert("Marks must be between 0 and 100.");

            return;
        }


        // Duplicate Roll Number

        const duplicate =
            students.some(
                student =>
                    student.roll.toLowerCase() ===
                    roll.toLowerCase()
            );


        if (duplicate) {

            alert(
                "A student with this roll number already exists."
            );

            return;
        }


        // Add student

        const student = {

            name: name,

            roll: roll,

            course: course,

            marks: marks

        };


        students.push(student);


        saveData();


        // Reset form

        document
            .getElementById("studentForm")
            .reset();


        // Update everything

        displayStudents();


        alert("Student added successfully.");

    });


// ============================================
// SAVE DATA
// ============================================

function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ============================================
// GET GRADE
// ============================================

function getGrade(marks) {

    if (marks >= 90)
        return "A+";

    if (marks >= 80)
        return "A";

    if (marks >= 70)
        return "B+";

    if (marks >= 60)
        return "B";

    if (marks >= 50)
        return "C";

    return "F";
}


// ============================================
// GET GRADE CLASS
// ============================================

function getGradeClass(marks) {

    if (marks >= 90)
        return "grade-a-plus";

    if (marks >= 80)
        return "grade-a";

    if (marks >= 70)
        return "grade-b-plus";

    if (marks >= 60)
        return "grade-b";

    if (marks >= 50)
        return "grade-c";

    return "grade-f";
}


// ============================================
// DISPLAY STUDENTS
// ============================================

function displayStudents() {

    const table =
        document.getElementById("studentTable");


    const emptyState =
        document.getElementById("emptyState");


    const searchInput =
        document.getElementById("searchInput");


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    table.innerHTML = "";


    // Search

    const filteredStudents =
        students.filter(student => {

            return (

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.roll
                    .toLowerCase()
                    .includes(search)

            );

        });


    // Empty state

    if (filteredStudents.length === 0) {

        emptyState.style.display = "block";

    } else {

        emptyState.style.display = "none";

    }


    // Create table rows

    filteredStudents.forEach(student => {

        const index =
            students.indexOf(student);


        const grade =
            getGrade(student.marks);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <span class="roll-number">
                    ${student.roll}
                </span>
            </td>

            <td>
                <span class="student-name">
                    ${student.name}
                </span>
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                ${student.marks}
            </td>

            <td>

                <span
                    class="grade ${getGradeClass(student.marks)}"
                >
                    ${grade}
                </span>

            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit-action"
                        onclick="openEditModal(${index})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-btn delete-action"
                        onclick="deleteStudent(${index})"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        table.appendChild(row);

    });


    updateStatistics();

}


// ============================================
// SEARCH
// ============================================

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        displayStudents();

    });


// ============================================
// STATISTICS
// ============================================

function updateStatistics() {

    const total =
        students.length;


    document
        .getElementById("totalStudents")
        .innerText = total;


    if (total === 0) {

        document
            .getElementById("averageMarks")
            .innerText = "0";


        document
            .getElementById("highestMarks")
            .innerText = "0";


        document
            .getElementById("passingStudents")
            .innerText = "0";


        return;

    }


    // Total marks

    let totalMarks = 0;


    students.forEach(student => {

        totalMarks +=
            Number(student.marks);

    });


    const average =
        totalMarks / total;


    // Highest

    const highest =
        Math.max(
            ...students.map(
                student =>
                    Number(student.marks)
            )
        );


    // Passing

    const passing =
        students.filter(
            student =>
                Number(student.marks) >= 50
        ).length;


    document
        .getElementById("averageMarks")
        .innerText =
        average.toFixed(2);


    document
        .getElementById("highestMarks")
        .innerText =
        highest;


    document
        .getElementById("passingStudents")
        .innerText =
        passing;

}


// ============================================
// DELETE
// ============================================

function deleteStudent(index) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmation)
        return;


    students.splice(index, 1);


    saveData();


    displayStudents();

}


// ============================================
// OPEN EDIT MODAL
// ============================================

function openEditModal(index) {

    editingIndex = index;


    const student =
        students[index];


    document
        .getElementById("editName")
        .value =
        student.name;


    document
        .getElementById("editRoll")
        .value =
        student.roll;


    document
        .getElementById("editCourse")
        .value =
        student.course;


    document
        .getElementById("editMarks")
        .value =
        student.marks;


    document
        .getElementById("editModal")
        .classList.add("show");

}


// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {

    document
        .getElementById("editModal")
        .classList.remove("show");


    editingIndex = null;

}


// ============================================
// UPDATE STUDENT
// ============================================

function updateStudent() {

    if (editingIndex === null)
        return;


    const name =
        document
            .getElementById("editName")
            .value
            .trim();


    const roll =
        document
            .getElementById("editRoll")
            .value
            .trim();


    const course =
        document
            .getElementById("editCourse")
            .value;


    const marks =
        Number(
            document
                .getElementById("editMarks")
                .value
        );


    if (!name || !roll || !course) {

        alert("Please fill all fields.");

        return;
    }


    if (marks < 0 || marks > 100) {

        alert("Marks must be between 0 and 100.");

        return;
    }


    // Check duplicate roll number

    const duplicate =
        students.some(
            (student, index) => {

                return (
                    index !== editingIndex &&
                    student.roll.toLowerCase() ===
                    roll.toLowerCase()
                );

            }
        );


    if (duplicate) {

        alert(
            "Another student already has this roll number."
        );

        return;
    }


    students[editingIndex] = {

        name: name,

        roll: roll,

        course: course,

        marks: marks

    };


    saveData();


    closeModal();


    displayStudents();

}


// ============================================
// CLOSE MODAL ON OUTSIDE CLICK
// ============================================

document
    .getElementById("editModal")
    .addEventListener("click", function (event) {

        if (event.target === this) {

            closeModal();

        }

    });