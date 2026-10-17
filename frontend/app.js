const API_URL = 'http://localhost:3000/api/timetable';

const form = document.getElementById('timetableForm');
const formTitle = document.getElementById('formTitle');
const recordIdInput = document.getElementById('recordId');
const courseCodeInput = document.getElementById('course_code');
const courseNameInput = document.getElementById('course_name');
const dayOfWeekInput = document.getElementById('day_of_week');
const classTimeInput = document.getElementById('class_time');
const weeklyGoalInput = document.getElementById('weekly_goal');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const tableBody = document.getElementById('timetableTableBody');

// Fetch and display records on load
async function fetchTimetable() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.course_code}</td>
                <td>${item.course_name || ''}</td>
                <td>${item.day_of_week || ''}</td>
                <td>${item.class_time || ''}</td>
                <td>${item.weekly_goal || ''}</td>
                <td class="action-btns">
                    <button onclick="editRecord(${item.id}, '${item.course_code}', '${item.course_name || ''}', '${item.day_of_week || ''}', '${item.class_time || ''}', '${item.weekly_goal || ''}')">Edit</button>
                    <button class="delete-btn" onclick="deleteRecord(${item.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching timetable:', err);
    }
}

// Handle Form Submit (Create or Update)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = recordIdInput.value;
    const payload = {
        course_code: courseCodeInput.value,
        course_name: courseNameInput.value,
        day_of_week: dayOfWeekInput.value,
        class_time: classTimeInput.value,
        weekly_goal: weeklyGoalInput.value
    };

    try {
        if (id) {
            // Update (PUT)
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // Create (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }
        resetForm();
        fetchTimetable();
    } catch (err) {
        console.error('Error saving record:', err);
    }
});

// Load values into form for editing
window.editRecord = function(id, code, name, day, time, goal) {
    recordIdInput.value = id;
    courseCodeInput.value = code;
    courseNameInput.value = name;
    dayOfWeekInput.value = day;
    classTimeInput.value = time;
    weeklyGoalInput.value = goal;

    formTitle.textContent = 'Edit Timetable Entry';
    submitBtn.textContent = 'Update Entry';
    cancelBtn.style.display = 'inline-block';
};

// Delete record (DELETE)
window.deleteRecord = async function(id) {
    if (confirm('Are you sure you want to delete this entry?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchTimetable();
        } catch (err) {
            console.error('Error deleting record:', err);
        }
    }
};

// Reset form state
window.resetForm = function() {
    form.reset();
    recordIdInput.value = '';
    formTitle.textContent = 'Add New Timetable Entry';
    submitBtn.textContent = 'Add Entry';
    cancelBtn.style.display = 'none';
};

// Initial load
fetchTimetable();