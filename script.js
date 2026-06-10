let calculateCGPA = () => {

    let allcards = document.querySelectorAll(".card");
    let allGPA = 0;
    let allCREDIT = 0;

    allcards.forEach(card => {

        let gpatext = card.querySelector(".gpa").textContent;
        let val = parseFloat(gpatext.split(":")[1]);

        let rows = card.querySelectorAll("tbody tr");
        let hrs = 0;

        rows.forEach(row => {
            let credit = parseFloat(row.querySelector(".credit").value);

            if (!isNaN(credit)) {
                hrs += credit;
            }
        });

        if (!isNaN(val) && hrs > 0) {
            allGPA += val * hrs;
            allCREDIT += hrs;
        }

    });

    let CGPA = allCREDIT === 0 ? 0 : allGPA / allCREDIT;

    document.querySelector(".value").textContent = CGPA.toFixed(2);
};
document.addEventListener("change", (e) => {

    if (e.target.classList.contains("Grades")) {

        let row = e.target.closest("tr");
        let points = row.querySelector(".points");
        let gpoint = e.target.value;
        if (gpoint !== "Grade") {
            points.textContent = gpoint;
        } else {
            points.textContent = "-";
        }
    }

});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("ADD")) {
        let semester = e.target.closest(".cardbody");
        let tbody = semester.querySelector("tbody");
        let row = document.createElement("tr");
        row.innerHTML = `
    <td><input type="text" placeholder="e.g Calculus"></td>
                            <td><input type="number" class="credit" placeholder="3" min="0" step="1"></td>
                            <td><select class="Grades">
                            <option value="Grade" >Grade</option>
                            <option value="4.0">A</option>
                                <option value="3.7">A-</option>
                                <option value="3.3">B+</option>
                                <option value="3.0">B</option>
                                <option value="2.7">B-</option>
                                <option value="2.3">C+</option>
                                <option value="2.0">C</option>
                                <option value="1.0">D</option>
                                <option value="0">F</option>
                        </select></td>
                            <td class="points" style="text-align: center">-</td>
                            <td><button class="btn-delete" title="Remove row">x</button></td>`
        tbody.appendChild(row);
    }
});
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        let row = e.target.closest("tr");
        row.remove();
    }
});
let allgpa = [];
let allcred_hrs = [];
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("cal")) {

        let sem = e.target.closest(".cardbody");
        let semgpa = sem.previousElementSibling.querySelector(".gpa");
        let rows = sem.querySelectorAll("tbody tr");

        let crdhrs = 0;
        let g = 0;
        let haserror = false;
        rows.forEach(row => {

            let point = parseFloat(row.querySelector(".points").textContent);
            let credit = parseFloat(row.querySelector(".credit").value);

            if (!isNaN(point) && !isNaN(credit)) {
                g += point * credit;
                crdhrs += credit;
            } else {
                haserror = true;
            }

        });
        if (!haserror) {
            let gpa = crdhrs === 0 ? 0 : g / crdhrs;


            semgpa.textContent = "GPA: " + gpa.toFixed(2);

            semgpa.classList.add("highlight");

            calculateCGPA();
            setTimeout(() => {
                semgpa.classList.remove("highlight");
            }, 2000);

        } else {
            alert("⚠️ Please fill all the missing fields for calculation!");
        }

    }

});
let sem_count = 2;
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("addsemes")) {
        sem_count++;
        let currsem = e.target.closest(".card");
        let newsem = document.createElement("div");
        newsem.classList.add("card");
        newsem.innerHTML = `
         <div class="cardheader">
                <h2>Semester ${sem_count}</h2>
                <span class="gpa">GPA:0.00</span>
            </div>
            <div class="cardbody">
                <table class="Table">
                    <thead class="table_header">
                        <tr>
                            <th>COURSE NAME</th>
                            <th>CREDIT HOURS</th>
                            <th>GRADE</th>
                            <th style="text-align: center">GRADE PT.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="tablebody">
                        <tr>
                            <td><input type="text" placeholder="e.g Calculus"></td>
                            <td><input type="number" class="credit" placeholder="3" min="0" step="1"></td>
                            <td><select class="Grades">
                            <option value="Grade" >Grade</option>
                            <option value="4.0">A</option>
                                <option value="3.7">A-</option>
                                <option value="3.3">B+</option>
                                <option value="3.0">B</option>
                                <option value="2.7">B-</option>
                                <option value="2.3">C+</option>
                                <option value="2.0">C</option>
                                <option value="1.0">D</option>
                                <option value="0">F</option>
                        </select></td>
                            <td class="points" style="text-align: center">-</td>
                            <td><button class="btn-delete" title="Remove row">x</button></td>

                        </tr>
                        <tr>
                            <td><input type="text" placeholder="e.g DSA"></td>
                            <td><input type="number" class="credit" placeholder="3" min="0" step="1"></td>
                            <td><select class="Grades">
                            <option value="Grade">Grade</option>
                            <option value="4.0">A</option>
                                <option value="3.7">A-</option>
                                <option value="3.3">B+</option>
                                <option value="3.0">B</option>
                                <option value="2.7">B-</option>
                                <option value="2.3">C+</option>
                                <option value="2.0">C</option>
                                <option value="1.0">D</option>
                                <option value="0">F</option>
                        </select></td>
                            <td class="points" style="text-align: center">-</td>
                            <td><button class="btn-delete" title="Remove row">x</button></td>

                        </tr>


                    </tbody>

                </table>
                <div class="Addsubject">
                    <button class="ADD">+ ADD COURSE</button>
                </div>
                <div class="calculate">
                    <button class="cal">Calculate GPA</button>
                </div>`
        let main = document.querySelector(".maincard");

        main.appendChild(newsem);

    }
});