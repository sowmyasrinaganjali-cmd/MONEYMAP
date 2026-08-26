/* =====================================================
   MONEYMAP - APPLICATION JAVASCRIPT
===================================================== */


/* =====================================================
   1. APPLICATION DATA
===================================================== */

let appData = {

    income: [],

    expenses: [],

    goals: []

};


/* =====================================================
   2. DOM ELEMENTS
===================================================== */

const totalIncomeElement =
    document.getElementById("totalIncome");

const totalExpensesElement =
    document.getElementById("totalExpenses");

const availableBalanceElement =
    document.getElementById("availableBalance");

const savingsRateElement =
    document.getElementById("savingsRate");

const budgetIncomeElement =
    document.getElementById("budgetIncome");

const budgetSpentElement =
    document.getElementById("budgetSpent");

const budgetRemainingElement =
    document.getElementById("budgetRemaining");

const budgetPercentageElement =
    document.getElementById("budgetPercentage");

const expenseBreakdownElement =
    document.getElementById("expenseBreakdown");

const recentTransactionsElement =
    document.getElementById("recentTransactions");

const expenseListElement =
    document.getElementById("expenseList");

const transactionListElement =
    document.getElementById("transactionList");

const goalsContainerElement =
    document.getElementById("goalsContainer");

const currentDateElement =
    document.getElementById("currentDate");

const notificationElement =
    document.getElementById("notification");

const notificationMessageElement =
    document.getElementById("notificationMessage");

const notificationIconElement =
    document.getElementById("notificationIcon");


/* =====================================================
   3. INITIALIZE APPLICATION
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    loadData();

    setCurrentDate();

    setDefaultDates();

    setupNavigation();

    setupModals();

    setupForms();

    setupQuickButtons();

    setupTheme();

    setupExport();

    renderEverything();

});


/* =====================================================
   4. LOCAL STORAGE
===================================================== */

function loadData() {

    const savedData =
        localStorage.getItem("moneyMapData");

    if (savedData) {

        try {

            appData = JSON.parse(savedData);

        } catch (error) {

            console.error(
                "Could not load saved data:",
                error
            );

            appData = {
                income: [],
                expenses: [],
                goals: []
            };

        }

    }

}


function saveData() {

    localStorage.setItem(
        "moneyMapData",
        JSON.stringify(appData)
    );

}


/* =====================================================
   5. DATE
===================================================== */

function setCurrentDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    currentDateElement.textContent =
        today.toLocaleDateString(
            "en-IN",
            options
        );

}


function getTodayString() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(today.getDate())
            .padStart(2, "0");

    return `${year}-${month}-${day}`;

}


function setDefaultDates() {

    const today =
        getTodayString();

    const incomeDate =
        document.getElementById(
            "incomeDate"
        );

    const expenseDate =
        document.getElementById(
            "expenseDate"
        );

    const goalDate =
        document.getElementById(
            "goalDate"
        );

    if (incomeDate) {
        incomeDate.value = today;
    }

    if (expenseDate) {
        expenseDate.value = today;
    }

    if (goalDate) {

        const future =
            new Date();

        future.setMonth(
            future.getMonth() + 3
        );

        goalDate.value =
            future.toISOString()
                .split("T")[0];

    }

}


/* =====================================================
   6. NAVIGATION
===================================================== */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(
            ".nav-item"
        );

    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const section =
                    item.dataset.section;

                showSection(section);

            }
        );

    });


    document
        .querySelectorAll(
            "[data-section-button]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.sectionButton
                    );

                }
            );

        });

}


function showSection(sectionId) {

    document
        .querySelectorAll(
            ".page-section"
        )
        .forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


    const selectedSection =
        document.getElementById(
            sectionId
        );

    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

            if (
                item.dataset.section ===
                sectionId
            ) {

                item.classList.add(
                    "active"
                );

            }

        });


    const titles = {

        dashboard: [
            "Dashboard",
            "Here's your financial overview."
        ],

        expenses: [
            "Expenses",
            "Track where your money is going."
        ],

        goals: [
            "Savings Goals",
            "Turn your dreams into financial goals."
        ],

        transactions: [
            "Transactions",
            "Your complete financial activity."
        ]

    };


    const title =
        titles[sectionId];

    if (title) {

        document.getElementById(
            "pageTitle"
        ).textContent = title[0];

        document.getElementById(
            "pageSubtitle"
        ).textContent = title[1];

    }

}


/* =====================================================
   7. MODALS
===================================================== */

function setupModals() {

    document
        .querySelectorAll(
            "[data-close]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    closeModal(
                        button.dataset.close
                    );

                }
            );

        });


    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(".modal.show")
                    .forEach(modal => {

                        modal.classList.remove(
                            "show"
                        );

                    });

            }

        }
    );

}


function openModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );

    if (modal) {

        modal.classList.add("show");

    }

}


function closeModal(modalId) {

    const modal =
        document.getElementById(
            modalId
        );

    if (modal) {

        modal.classList.remove("show");

    }

}


/* =====================================================
   8. QUICK BUTTONS
===================================================== */

function setupQuickButtons() {

    document
        .getElementById(
            "quickIncomeButton"
        )
        .addEventListener(
            "click",
            () => {

                resetIncomeForm();

                openModal("incomeModal");

            }
        );


    document
        .getElementById(
            "quickExpenseButton"
        )
        .addEventListener(
            "click",
            () => {

                resetExpenseForm();

                openModal("expenseModal");

            }
        );


    document
        .getElementById(
            "addExpenseButton"
        )
        .addEventListener(
            "click",
            () => {

                resetExpenseForm();

                openModal("expenseModal");

            }
        );


    document
        .getElementById(
            "addGoalButton"
        )
        .addEventListener(
            "click",
            () => {

                resetGoalForm();

                openModal("goalModal");

            }
        );

}


/* =====================================================
   9. FORMS
===================================================== */

function setupForms() {

    document
        .getElementById(
            "incomeForm"
        )
        .addEventListener(
            "submit",
            handleIncomeSubmit
        );


    document
        .getElementById(
            "expenseForm"
        )
        .addEventListener(
            "submit",
            handleExpenseSubmit
        );


    document
        .getElementById(
            "goalForm"
        )
        .addEventListener(
            "submit",
            handleGoalSubmit
        );

}


/* =====================================================
   10. ADD INCOME
===================================================== */

function handleIncomeSubmit(event) {

    event.preventDefault();


    const source =
        document
            .getElementById(
                "incomeSource"
            )
            .value
            .trim();


    const amount =
        Number(
            document
                .getElementById(
                    "incomeAmount"
                )
                .value
        );


    const date =
        document
            .getElementById(
                "incomeDate"
            )
            .value;


    if (
        !source ||
        !amount ||
        amount <= 0 ||
        !date
    ) {

        showNotification(
            "Please enter valid income details.",
            "error"
        );

        return;

    }


    const income = {

        id: createId(),

        type: "income",

        source: source,

        amount: amount,

        date: date

    };


    appData.income.push(
        income
    );


    saveData();

    renderEverything();

    closeModal("incomeModal");

    resetIncomeForm();


    showNotification(
        "Income added successfully!"
    );

}


/* =====================================================
   11. ADD EXPENSE
===================================================== */

function handleExpenseSubmit(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "expenseName"
            )
            .value
            .trim();


    const category =
        document
            .getElementById(
                "expenseCategory"
            )
            .value;


    const amount =
        Number(
            document
                .getElementById(
                    "expenseAmount"
                )
                .value
        );


    const date =
        document
            .getElementById(
                "expenseDate"
            )
            .value;


    if (
        !name ||
        !category ||
        !amount ||
        amount <= 0 ||
        !date
    ) {

        showNotification(
            "Please enter valid expense details.",
            "error"
        );

        return;

    }


    const expense = {

        id: createId(),

        type: "expense",

        name: name,

        category: category,

        amount: amount,

        date: date

    };


    appData.expenses.push(
        expense
    );


    saveData();

    renderEverything();

    closeModal("expenseModal");

    resetExpenseForm();


    showNotification(
        "Expense added successfully!"
    );

}


/* =====================================================
   12. ADD SAVINGS GOAL
===================================================== */

function handleGoalSubmit(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "goalName"
            )
            .value
            .trim();


    const target =
        Number(
            document
                .getElementById(
                    "goalTarget"
                )
                .value
        );


    const saved =
        Number(
            document
                .getElementById(
                    "goalSaved"
                )
                .value
        );


    const targetDate =
        document
            .getElementById(
                "goalDate"
            )
            .value;


    if (
        !name ||
        !target ||
        target <= 0 ||
        saved < 0 ||
        saved > target ||
        !targetDate
    ) {

        showNotification(
            "Please enter valid goal details.",
            "error"
        );

        return;

    }


    const goal = {

        id: createId(),

        name: name,

        target: target,

        saved: saved,

        targetDate: targetDate

    };


    appData.goals.push(
        goal
    );


    saveData();

    renderEverything();

    closeModal("goalModal");

    resetGoalForm();


    showNotification(
        "Savings goal created!"
    );

}


/* =====================================================
   13. RESET FORMS
===================================================== */

function resetIncomeForm() {

    const form =
        document.getElementById(
            "incomeForm"
        );

    form.reset();

    document.getElementById(
        "incomeDate"
    ).value = getTodayString();

}


function resetExpenseForm() {

    const form =
        document.getElementById(
            "expenseForm"
        );

    form.reset();

    document.getElementById(
        "expenseDate"
    ).value = getTodayString();

}


function resetGoalForm() {

    const form =
        document.getElementById(
            "goalForm"
        );

    form.reset();

    const future =
        new Date();

    future.setMonth(
        future.getMonth() + 3
    );

    document.getElementById(
        "goalDate"
    ).value =
        future.toISOString()
            .split("T")[0];

}


/* =====================================================
   14. CALCULATIONS
===================================================== */

function getTotalIncome() {

    return appData.income.reduce(
        (total, item) =>
            total + Number(item.amount),
        0
    );

}


function getTotalExpenses() {

    return appData.expenses.reduce(
        (total, item) =>
            total + Number(item.amount),
        0
    );

}


function getBalance() {

    return (
        getTotalIncome() -
        getTotalExpenses()
    );

}


function getSavingsRate() {

    const income =
        getTotalIncome();

    if (income <= 0) {

        return 0;

    }


    const balance =
        getBalance();

    return (
        (balance / income) *
        100
    );

}


/* =====================================================
   15. UPDATE DASHBOARD
===================================================== */

function updateDashboard() {

    const income =
        getTotalIncome();

    const expenses =
        getTotalExpenses();

    const balance =
        getBalance();

    const savingsRate =
        getSavingsRate();


    totalIncomeElement.textContent =
        formatCurrency(income);


    totalExpensesElement.textContent =
        formatCurrency(expenses);


    availableBalanceElement.textContent =
        formatCurrency(balance);


    savingsRateElement.textContent =
        `${Math.max(
            0,
            savingsRate
        ).toFixed(0)}%`;


    budgetIncomeElement.textContent =
        formatCurrency(income);


    budgetSpentElement.textContent =
        formatCurrency(expenses);


    budgetRemainingElement.textContent =
        formatCurrency(balance);


    updateBudgetCircle(
        income,
        expenses
    );

}


/* =====================================================
   16. BUDGET CIRCLE
===================================================== */

function updateBudgetCircle(
    income,
    expenses
) {

    let percentage = 0;


    if (income > 0) {

        percentage =
            (expenses / income) * 100;

    }


    percentage =
        Math.min(
            Math.max(
                percentage,
                0
            ),
            100
        );


    budgetPercentageElement.textContent =
        `${percentage.toFixed(0)}%`;


    const degrees =
        percentage * 3.6;


    const circle =
        document.querySelector(
            ".budget-circle"
        );


    circle.style.background =
        `conic-gradient(
            var(--primary)
            ${degrees}deg,
            var(--surface-secondary)
            ${degrees}deg
        )`;

}


/* =====================================================
   17. EXPENSE BREAKDOWN
===================================================== */

function renderExpenseBreakdown() {

    if (
        appData.expenses.length === 0
    ) {

        expenseBreakdownElement.innerHTML = `

            <div class="empty-state">

                <div>📊</div>

                <p>
                    No expenses yet.
                </p>

                <small>
                    Add your first expense to see
                    your spending breakdown.
                </small>

            </div>

        `;

        return;

    }


    const categories = {};


    appData.expenses.forEach(
        expense => {

            if (
                !categories[
                    expense.category
                ]
            ) {

                categories[
                    expense.category
                ] = 0;

            }


            categories[
                expense.category
            ] += Number(
                expense.amount
            );

        }
    );


    const total =
        getTotalExpenses();


    const sortedCategories =
        Object.entries(categories)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            );


    expenseBreakdownElement.innerHTML =
        sortedCategories
            .map(
                ([category, amount]) => {

                    const percentage =
                        total > 0
                            ? (
                                amount /
                                total
                            ) * 100
                            : 0;


                    return `

                        <div class="expense-category">

                            <div
                                class="expense-category-header">

                                <span>
                                    ${getCategoryEmoji(category)}
                                    ${escapeHtml(category)}
                                </span>

                                <strong>
                                    ${formatCurrency(amount)}
                                </strong>

                            </div>


                            <div class="progress-bar">

                                <div
                                    class="progress-bar-fill"
                                    style="width: ${percentage}%">
                                </div>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =====================================================
   18. RECENT TRANSACTIONS
===================================================== */

function renderRecentTransactions() {

    const transactions =
        getAllTransactions()
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            )
            .slice(0, 5);


    if (
        transactions.length === 0
    ) {

        recentTransactionsElement.innerHTML = `

            <div class="empty-state">

                <div>💳</div>

                <p>
                    No transactions yet.
                </p>

                <small>
                    Your recent transactions will appear here.
                </small>

            </div>

        `;

        return;

    }


    recentTransactionsElement.innerHTML =
        transactions
            .map(
                transaction =>
                    createTransactionHTML(
                        transaction
                    )
            )
            .join("");

}


/* =====================================================
   19. ALL TRANSACTIONS
===================================================== */

function renderTransactions() {

    const transactions =
        getAllTransactions()
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


    if (
        transactions.length === 0
    ) {

        transactionListElement.innerHTML = `

            <div class="empty-state">

                <div>📋</div>

                <p>
                    No transactions yet.
                </p>

                <small>
                    Your transactions will appear here.
                </small>

            </div>

        `;

        return;

    }


    transactionListElement.innerHTML =
        transactions
            .map(
                transaction =>
                    createTransactionHTML(
                        transaction
                    )
            )
            .join("");

}


/* =====================================================
   20. CREATE TRANSACTION HTML
===================================================== */

function createTransactionHTML(
    transaction
) {

    const isIncome =
        transaction.type === "income";


    const name =
        isIncome
            ? transaction.source
            : transaction.name;


    const icon =
        isIncome
            ? "💰"
            : getCategoryEmoji(
                transaction.category
            );


    const amount =
        isIncome
            ? `+${formatCurrency(
                transaction.amount
            )}`
            : `-${formatCurrency(
                transaction.amount
            )}`;


    const meta =
        isIncome
            ? `Income • ${formatDate(
                transaction.date
            )}`
            : `${transaction.category} • ${formatDate(
                transaction.date
            )}`;


    return `

        <div class="transaction-item">

            <div class="transaction-left">

                <div class="transaction-icon">
                    ${icon}
                </div>

                <div>

                    <div class="transaction-name">
                        ${escapeHtml(name)}
                    </div>

                    <div class="transaction-meta">
                        ${escapeHtml(meta)}
                    </div>

                </div>

            </div>


            <div>

                <span
                    class="
                        transaction-amount
                        ${isIncome
                            ? "income"
                            : "expense"}
                    ">

                    ${amount}

                </span>


                <button
                    class="delete-button"
                    onclick="
                        deleteTransaction(
                            '${transaction.id}',
                            '${transaction.type}'
                        )
                    ">

                    🗑️

                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   21. EXPENSE LIST
===================================================== */

function renderExpenseList() {

    const expenses =
        [...appData.expenses]
            .sort(
                (a, b) =>
                    new Date(b.date) -
                    new Date(a.date)
            );


    if (
        expenses.length === 0
    ) {

        expenseListElement.innerHTML = `

            <div class="empty-state">

                <div>💸</div>

                <p>
                    No expenses recorded.
                </p>

                <small>
                    Start tracking your expenses.
                </small>

            </div>

        `;

        return;

    }


    expenseListElement.innerHTML =
        expenses
            .map(
                expense => `

                    <div
                        class="expense-list-item">

                        <div
                            class="expense-details">

                            <div
                                class="expense-details-icon">

                                ${getCategoryEmoji(
                                    expense.category
                                )}

                            </div>


                            <div>

                                <h4>
                                    ${escapeHtml(
                                        expense.name
                                    )}
                                </h4>

                                <p>
                                    ${escapeHtml(
                                        expense.category
                                    )}
                                    •
                                    ${formatDate(
                                        expense.date
                                    )}
                                </p>

                            </div>

                        </div>


                        <div
                            class="expense-actions">

                            <span
                                class="expense-price">

                                -${formatCurrency(
                                    expense.amount
                                )}

                            </span>


                            <button
                                class="delete-button"
                                style="opacity: 1"
                                onclick="
                                    deleteTransaction(
                                        '${expense.id}',
                                        'expense'
                                    )
                                ">

                                🗑️

                            </button>

                        </div>

                    </div>

                `
            )
            .join("");

}


/* =====================================================
   22. SAVINGS GOALS
===================================================== */

function renderGoals() {

    if (
        appData.goals.length === 0
    ) {

        goalsContainerElement.innerHTML = `

            <div class="empty-state card">

                <div>🎯</div>

                <p>
                    No savings goals yet.
                </p>

                <small>
                    Create a goal such as a laptop,
                    emergency fund or vacation.
                </small>

            </div>

        `;

        return;

    }


    goalsContainerElement.innerHTML =
        appData.goals
            .map(
                goal => {

                    const percentage =
                        goal.target > 0
                            ? (
                                goal.saved /
                                goal.target
                            ) * 100
                            : 0;


                    const progress =
                        Math.min(
                            Math.max(
                                percentage,
                                0
                            ),
                            100
                        );


                    const remaining =
                        Math.max(
                            0,
                            goal.target -
                            goal.saved
                        );


                    return `

                        <div class="goal-card">

                            <div class="goal-header">

                                <div class="goal-icon">
                                    🎯
                                </div>


                                <button
                                    class="goal-delete"
                                    onclick="
                                        deleteGoal(
                                            '${goal.id}'
                                        )
                                    ">

                                    🗑️

                                </button>

                            </div>


                            <h3>
                                ${escapeHtml(
                                    goal.name
                                )}
                            </h3>


                            <p>
                                Target:
                                ${formatDate(
                                    goal.targetDate
                                )}
                            </p>


                            <div class="goal-progress">

                                <div
                                    class="goal-progress-fill"
                                    style="
                                        width: ${progress}%;
                                    ">
                                </div>

                            </div>


                            <div
                                class="goal-progress-info">

                                <span>
                                    ${formatCurrency(
                                        goal.saved
                                    )}
                                </span>

                                <strong>
                                    ${progress.toFixed(0)}%
                                </strong>

                                <span>
                                    ${formatCurrency(
                                        goal.target
                                    )}
                                </span>

                            </div>


                            <p
                                style="
                                    margin-top: 12px;
                                ">

                                ${remaining === 0
                                    ? "🎉 Goal completed!"
                                    : `${formatCurrency(
                                        remaining
                                    )} remaining`}

                            </p>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =====================================================
   23. GET ALL TRANSACTIONS
===================================================== */

function getAllTransactions() {

    return [
        ...appData.income,
        ...appData.expenses
    ];

}


/* =====================================================
   24. DELETE TRANSACTION
===================================================== */

function deleteTransaction(
    id,
    type
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!confirmed) {

        return;

    }


    if (type === "income") {

        appData.income =
            appData.income.filter(
                item =>
                    item.id !== id
            );

    }


    if (type === "expense") {

        appData.expenses =
            appData.expenses.filter(
                item =>
                    item.id !== id
            );

    }


    saveData();

    renderEverything();


    showNotification(
        "Transaction deleted."
    );

}


/* =====================================================
   25. DELETE GOAL
===================================================== */

function deleteGoal(id) {

    const confirmed =
        confirm(
            "Delete this savings goal?"
        );


    if (!confirmed) {

        return;

    }


    appData.goals =
        appData.goals.filter(
            goal =>
                goal.id !== id
        );


    saveData();

    renderEverything();


    showNotification(
        "Savings goal deleted."
    );

}


/* =====================================================
   26. THEME
===================================================== */

function setupTheme() {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );


    const savedTheme =
        localStorage.getItem(
            "moneyMapTheme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

        themeButton.textContent =
            "☀️ Light Mode";

    }


    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "moneyMapTheme",
                isDark
                    ? "dark"
                    : "light"
            );


            themeButton.textContent =
                isDark
                    ? "☀️ Light Mode"
                    : "🌙 Dark Mode";

        }
    );

}



/* =====================================================
   27. EXPORT DATA AS PDF
===================================================== */

function setupExport() {

    const exportButton =
        document.getElementById("exportData");

    if (!exportButton) {
        return;
    }

    exportButton.addEventListener("click", () => {

        // Check if jsPDF is loaded
        if (!window.jspdf) {
            showNotification(
                "PDF library could not be loaded.",
                "error"
            );
            return;
        }

        const { jsPDF } = window.jspdf;

        // Create PDF
        const doc = new jsPDF();

        // -----------------------------
        // TITLE
        // -----------------------------

        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("MoneyMap", 20, 20);

        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text("Expense Report", 20, 30);

        // -----------------------------
        // EXPORT DATE
        // -----------------------------

        doc.setFontSize(10);

        const exportDate =
            new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });

        doc.text(
            `Exported on: ${exportDate}`,
            20,
            40
        );

        // -----------------------------
        // SUMMARY
        // -----------------------------

        const totalExpenses =
            getTotalExpenses();

        const expenseCount =
            appData.expenses.length;

        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");

        doc.text(
            `Total Expenses: ${formatCurrency(totalExpenses)}`,
            20,
            55
        );

        doc.text(
            `Number of Expenses: ${expenseCount}`,
            20,
            63
        );

        // -----------------------------
        // TABLE HEADER
        // -----------------------------

        let y = 78;

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        doc.text("Expense", 20, y);
        doc.text("Category", 75, y);
        doc.text("Date", 125, y);
        doc.text("Amount", 165, y);

        // Horizontal line

        doc.line(20, y + 3, 195, y + 3);

        y += 12;

        // -----------------------------
        // EXPENSE DATA
        // -----------------------------

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        if (appData.expenses.length === 0) {

            doc.text(
                "No expenses recorded.",
                20,
                y
            );

        } else {

            // Sort newest expenses first

            const expenses =
                [...appData.expenses].sort(
                    (a, b) =>
                        new Date(b.date) -
                        new Date(a.date)
                );

            expenses.forEach(expense => {

                // Create a new page
                // when the current page is full

                if (y > 275) {

                    doc.addPage();

                    y = 20;

                    // Header on new page

                    doc.setFont("helvetica", "bold");

                    doc.text(
                        "Expense",
                        20,
                        y
                    );

                    doc.text(
                        "Category",
                        75,
                        y
                    );

                    doc.text(
                        "Date",
                        125,
                        y
                    );

                    doc.text(
                        "Amount",
                        165,
                        y
                    );

                    doc.line(
                        20,
                        y + 3,
                        195,
                        y + 3
                    );

                    y += 12;

                    doc.setFont("helvetica", "normal");
                }

                // Expense name

                doc.text(
                    String(expense.name)
                        .substring(0, 25),
                    20,
                    y
                );

                // Category

                doc.text(
                    String(expense.category)
                        .substring(0, 20),
                    75,
                    y
                );

                // Date

                doc.text(
                    formatDate(expense.date),
                    125,
                    y
                );

                // Amount

                doc.text(
                    formatCurrency(expense.amount),
                    165,
                    y
                );

                y += 9;
            });
        }

        // -----------------------------
        // TOTAL
        // -----------------------------

        if (y > 270) {

            doc.addPage();

            y = 20;
        }

        doc.line(
            20,
            y + 2,
            195,
            y + 2
        );

        y += 12;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);

        doc.text(
            "Total Expenses:",
            110,
            y
        );

        doc.text(
            formatCurrency(totalExpenses),
            165,
            y
        );

        // -----------------------------
        // FOOTER
        // -----------------------------

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text(
            "Generated by MoneyMap",
            20,
            290
        );

        // -----------------------------
        // AUTOMATIC DOWNLOAD
        // -----------------------------

        doc.save(
            "moneymap-expense-report.pdf"
        );

        // -----------------------------
        // SUCCESS MESSAGE
        // -----------------------------

        showNotification(
            "Expense report downloaded successfully!"
        );

    });

}



/* =====================================================
   28. NOTIFICATION
===================================================== */

let notificationTimer;


function showNotification(
    message,
    type = "success"
) {

    notificationMessageElement.textContent =
        message;


    if (type === "error") {

        notificationIconElement.textContent =
            "!";

        notificationIconElement.style.background =
            "rgba(240, 68, 56, 0.12)";

        notificationIconElement.style.color =
            "var(--danger)";

    } else {

        notificationIconElement.textContent =
            "✓";

        notificationIconElement.style.background =
            "rgba(18, 183, 106, 0.12)";

        notificationIconElement.style.color =
            "var(--success)";

    }


    notificationElement.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            () => {

                notificationElement.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =====================================================
   29. UTILITY FUNCTIONS
===================================================== */

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }
    ).format(amount);

}


function formatDate(dateString) {

    if (!dateString) {

        return "";

    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function createId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


function getCategoryEmoji(
    category
) {

    const emojis = {

        Food: "🍔",

        Transport: "🚌",

        Housing: "🏠",

        Bills: "💡",

        Shopping: "🛍️",

        Education: "📚",

        Health: "❤️",

        Entertainment: "🎬",

        Other: "📦"

    };


    return emojis[category] || "📦";

}


/*
   Prevent user-entered text from
   becoming HTML.
*/

function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent = text;

    return div.innerHTML;

}


/* =====================================================
   30. RENDER EVERYTHING
===================================================== */

function renderEverything() {

    updateDashboard();

    renderExpenseBreakdown();

    renderRecentTransactions();

    renderExpenseList();

    renderTransactions();

    renderGoals();

}