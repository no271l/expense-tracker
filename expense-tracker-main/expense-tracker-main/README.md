# expense-tracker
Full stack expense tracker with MySQL, Node.js and React.

## Οδηγίες Εκτέλεσης

Για την εκτέλεση της εφαρμογής, θα πρέπει να έχετε σε λειτουργία τόσο το backend (server) όσο και το frontend (interface).

### 1. Backend Setup

#### a. Database Setup
**Προαπαιτούμενα:** Βεβαιωθείτε ότι έχετε εγκατεστημένο και σε λειτουργία έναν MySQL server.

1.  **Δημιουργία Βάσης Δεδομένων:**
    Συνδεθείτε στον MySQL server σας (μέσω γραμμής εντοлών ή ενός εργαλείου όπως το MySQL Workbench) και δημιουργήστε μια νέα βάση δεδομένων. Για παράδειγμα:
    ```sql
    CREATE DATABASE expense_tracker_db;
    ```
2.  **Εισαγωγή του Σχήματος:**
    Εισάγετε τη δομή και τα αρχικά δεδομένα εκτελώντας το αρχείο `schema.sql` που βρίσκεται στον ριζικό φάκελο του project.

    Το `schema.sql` είναι το dump αρχείου της βάσης δεδομένων που δημιουργήθηκε στο δεύτερο παραδοτέο.
    Άνοιξε το MySQL Workbench και σύνδεσε στον τοπικό/απομακρυσμένο MySQL server (host, port 3306, user, password). Στη συνέχεια, μπορείς να εκτελέσεις το `schema.sql` με έναν από τους παρακάτω τρόπους:
    CREATE DATABASE expense_tracker_db;
    USE expense_tracker_db;
    SOURCE schema.sql;  
    Import του schema.sql μέσω Workbench:
    Server → Data Import → Import from Self-Contained File → επίλεξε schema.sql → Start Import
    έλεγξε ότι τα tables και τα αρχικά δεδομένα υπάρχουν στο schema μέσω του Schema Explorer στο Workbench
    
    *  
     # expense-tracker
     Full stack expense tracker with MySQL, Node.js and React.

     ## Οδηγίες Εκτέλεσης

     Για την εκτέλεση της εφαρμογής, βεβαιωθείτε ότι έχετε σε λειτουργία τόσο το backend (server) όσο και το frontend (interface).

     ### 1. Backend Setup

     #### a. Database Setup
     **Προαπαιτούμενα:** Ένας MySQL server (τοπικός ή απομακρυσμένος).

     1. **Δημιουργία βάσης (αν δεν υπάρχει):**
     ```sql
     CREATE DATABASE expensetrackerdb;
     ```

     2. **Import του schema (`schema.sql`) — MySQL Workbench:**
     - Άνοιξε το MySQL Workbench και σύνδεσε στον server (host, port 3306, user, password).
     - Επιλογή A — Self-contained import:
       - `Server` → `Data Import` → `Import from Self-Contained File` → επίλεξε `schema.sql` → `Start Import`.
     - Επιλογή B — Εκτέλεση script:
       - `File` → `Open SQL Script` → επίλεξε `schema.sql` → πάτησε `Execute`.
     - Εναλλακτικά, στο SQL Editor μπορείς να τρέξεις:
     ```sql
     USE expensetrackerdb;
     SOURCE schema.sql;
     ```
     - Έλεγξε μέσω του Schema Explorer ότι τα tables και τα αρχικά δεδομένα υπάρχουν.

     #### b. Application Setup

     1. **Μετάβαση στον φάκελο `backend`:**
     ```bash
     cd expense-tracker-main/backend
     ```
     2. **Εγκατάσταση dependencies:**
     ```bash
     npm install
     ```
     3. **dotenv & .env:**
     - Έχω προσθέσει `backend/.env.example`. Αντέγραψε το σε `backend/.env` και γέμισε με τα πραγματικά credentials:
     ```
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=appuser
     DB_PASS=strong_password
     DB_NAME=expensetrackerdb
     ```
     - Μην ανεβάζεις το `backend/.env` στο repository.
     4. **Εκκίνηση server:**
     ```bash
     npm start
     ```
     Ο server αναμένεται να τρέχει στο `http://localhost:3001`.

     ### 2. Frontend Setup

     1. Άνοιξε νέο τερματικό και πήγαινε στο `frontend`:
     ```bash
     cd expense-tracker-main/frontend
     npm install
     npm run dev
     ```
     2. Άνοιξε το URL που εμφανίζει το dev server (συνήθως `http://localhost:5173`).

     ---

     ## Βασικές Λειτουργίες

     Η εφαρμογή υποστηρίζει:

     - Διαχείριση χρηστών (εγγραφή, σύνδεση, JWT sessions)
     - Dashboard με υπόλοιπο, στόχους και κατανομή εξόδων
     - Καταχώρηση και ιστορικό κινήσεων (έξοδα, έσοδα, δάνεια)
     - Διαχείριση στόχων & αποταμίευσης

     ---

     Αν θέλεις, μπορώ να προσθέσω Windows PowerShell σημειώσεις ή screenshots για το Workbench.