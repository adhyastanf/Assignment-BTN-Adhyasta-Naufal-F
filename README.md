# Task Management Dashboard - Adhyasta Naufal Faadhilah

Aplikasi Task Management Dashboard yang dibangun menggunakan Next.js App Router, TypeScript, React Hook Form, Zod, Tailwind CSS, dan shadcn/ui.

Aplikasi ini memungkinkan pengguna untuk melihat daftar task, melakukan pencarian, filtering, sorting, melihat detail task, serta menambahkan task baru melalui form yang telah dilengkapi validasi.

---

# Teknologi yang Digunakan

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form
* Zod
* Lucide React

---

# Fitur Utama

## Dashboard Task (/tasks)

* Menampilkan seluruh task
* Menampilkan ringkasan jumlah task
* Pencarian task berdasarkan title atau assignee (case-insensitive)
* Implementasi debounced search menggunakan `useRef`
* Filter task berdasarkan status
* Sorting task berdasarkan:

  * Due Date terdekat
  * Created Date terbaru
  * Priority tertinggi
* Loading state menggunakan Suspense dan Skeleton
* Empty state ketika data tidak ditemukan
* Navigasi ke halaman detail task

## Detail Task (/tasks/[id])

* Menampilkan informasi lengkap task:

  * ID
  * Title
  * Description
  * Status
  * Priority
  * Assignee
  * Created Date
  * Due Date
* Menampilkan halaman not found ketika task tidak ditemukan
* Navigasi kembali ke halaman dashboard

## Tambah Task (/tasks/new)

* Form tambah task
* Validasi form
* Menampilkan pesan error pada setiap field
* Menampilkan ringkasan data setelah submit berhasil

Field yang tersedia:

* Title
* Description
* Assignee
* Priority
* Due Date

---

# Arsitektur Aplikasi

## App Router

Project menggunakan Next.js App Router.

Alasan penggunaan:

* Mendukung Server Components
* Routing yang lebih modern
* Pemisahan yang lebih baik antara server dan client
* Struktur project yang lebih scalable

---

## UI Components

Aplikasi menggunakan **shadcn/ui** sebagai component library utama.

Komponen shadcn/ui yang digunakan:

* Button
* Card
* Badge
* Input
* Select
* Calendar
* Popover
* Form
* Skeleton
* etc

Komponen reusable yang dibuat:

* TaskCard
* TaskSummary
* TaskFilter
* TaskSearch
* TaskSort
* TaskForm
* StatusBadge
* PriorityBadge
* EmptyState

---

## Server Side Rendering (SSR)

Halaman berikut menggunakan Server Components:

```text
/tasks
/tasks/[id]
```

Keuntungan:

* Initial render lebih cepat
* Mengurangi kebutuhan fetching data di client
* Pemisahan tanggung jawab server dan client lebih jelas
* Struktur data fetching lebih bersih

---

## Service Layer

Project menggunakan service layer untuk memusatkan logic pengambilan data.

Lokasi:

```text
src/services
```

Keuntungan:

* Separation of Concerns
* Reusable data fetching logic
* Mempermudah migrasi ke backend nyata di masa depan
* Menghindari duplikasi logic

---

## Data Flow

Arsitektur data pada aplikasi:

```text
Pages (SSR)
      ↓
Service Layer
      ↓
API Routes
      ↓
Dummy Data
```

Data dummy disimpan pada:

```text
src/data/tasks.ts
```

dan diekspos melalui API Route sehingga menyerupai pola aplikasi nyata yang mengonsumsi data dari backend.

---

# Bonus Requirement yang Diimplementasikan

## 1. Status Badge

Membuat badge status dengan tampilan berbeda untuk setiap status:

* Pending
* In Progress
* Completed
* Rejected

Tujuan:

* Mempermudah identifikasi status task
* Meningkatkan keterbacaan data

---

## 2. Priority Indicator

Mengimplementasikan urutan priority sesuai requirement:

```text
Critical > High > Medium > Low
```

Priority digunakan pada proses sorting sehingga urutan tidak berdasarkan alfabet, melainkan berdasarkan tingkat prioritas bisnis.

Contoh implementasi:

```typescript
const priorityOrder = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};
```

---

## 3. Utility Functions

Logic filtering dan sorting dipisahkan ke utility function.

Lokasi:

```text
src/utils/task-utils.ts
```

Function yang dibuat:

* filterTasks()
* sortTasks()

Keuntungan:

* Komponen lebih bersih
* Logic dapat digunakan kembali
* Mempermudah maintenance

---

## 4. Query Parameters

State pencarian, filter, dan sorting disinkronkan dengan URL.

Contoh:

```text
/tasks?search=andi

/tasks?status=Pending

/tasks?sort=priority

/tasks?status=Pending&search=andi
```

Keuntungan:

* URL dapat dibagikan
* State tetap tersimpan saat refresh
* Mendukung browser back/forward navigation

---

## 5. API Routes

Mengimplementasikan API Route menggunakan Next.js Route Handlers:

```text
GET /api/tasks

GET /api/tasks/[id]
```

Tujuan:

* Mensimulasikan integrasi backend
* Menyediakan layer API yang terpisah
* Mempermudah penggantian dummy data menjadi backend nyata di masa depan

---

# Implementasi Tambahan

## Loading State

Menggunakan:

* React Suspense
* Skeleton dari shadcn/ui

Keuntungan:

* User experience lebih baik saat data dimuat
* Loading state lebih konsisten
* Perceived performance lebih baik

---

## Not Found Handling

Mengimplementasikan halaman not found untuk task yang tidak ditemukan.

Contoh:

```text
/tasks/TASK-999
```

Aplikasi akan menampilkan halaman "Task Tidak Ditemukan" dibandingkan menampilkan halaman kosong.

---

## Empty State Component

Membuat komponen EmptyState yang reusable.

Digunakan ketika:

* Hasil pencarian tidak ditemukan
* Hasil filter tidak ditemukan

Tujuan:

* Memberikan feedback yang jelas kepada pengguna
* Menjaga konsistensi tampilan aplikasi

---

## Search Optimization

Fitur pencarian menggunakan teknik debounce dengan `useRef`.

Tujuan:

* Mengurangi update URL yang berlebihan saat user mengetik
* Mengurangi re-render yang tidak diperlukan
* Meningkatkan pengalaman pengguna

Alur kerja:

```text
User mengetik
      ↓
Debounce Delay
      ↓
Update Query Parameter
      ↓
Render ulang daftar task
```

Implementasi dilakukan tanpa library tambahan.

---

## Enhanced Task Form

Selain field yang diwajibkan pada requirement, form juga menyediakan field:

* Priority

Implementasi menggunakan:

* React Hook Form
* Zod
* shadcn/ui Select

Sehingga pengguna dapat menentukan prioritas task saat membuat task baru.

---

# Validasi Form

Form menggunakan:

* React Hook Form
* Zod

Aturan validasi:

| Field       | Validasi    |
| --------    | ----------- |
| Title       | Wajib diisi |
| Assignee    | Wajib diisi |
| Description | Optional    |
| Assignee    | Wajib diisi |
| Due Date    | Wajib diisi |

Pesan error ditampilkan langsung pada field yang bermasalah.

---

# Struktur Project

```text
src
├── app
│   ├── api
│   │   └── tasks
│   │       ├── route.ts
│   │       └── [id]
│   │           └── route.ts
│   │
│   └── tasks
│       ├── page.tsx
│       ├── loading.tsx
│       ├── new
│       │   └── page.tsx
│       └── [id]
│           ├── page.tsx
│           └── not-found.tsx
│
├── components
│   ├── TaskCard.tsx
│   ├── TaskSummary.tsx
│   ├── TaskFilter.tsx
│   ├── TaskSearch.tsx
│   ├── TaskSort.tsx
│   ├── TaskForm.tsx
│   ├── StatusBadge.tsx
│   ├── PriorityBadge.tsx
│   └── EmptyState.tsx
│
├── services
│   └── tasks.ts
│
├── data
│   └── tasks.ts
│
├── utils
│   └── task-utils.ts
│
├── types
│   └── task.ts
│
└── lib
```

---

# Cara Menjalankan Project

## Install Dependency

```bash
npm install
```

## Menjalankan Development Server

```bash
npm run dev
```

Aplikasi dapat diakses melalui:

```text
http://localhost:3000
```

---

# Daftar Route

| Route           | Deskripsi                        |
| --------------- | -------------------------------- |
| /tasks          | Dashboard Task                   |
| /tasks/new      | Halaman Tambah Task              |
| /tasks/[id]     | Halaman Detail Task              |
| /api/tasks      | API untuk mengambil seluruh task |
| /api/tasks/[id] | API untuk mengambil detail task  |

---

# Asumsi dan Batasan Implementasi

* Data menggunakan dummy data statis.
* Data task baru tidak disimpan secara permanen.
* Tidak menggunakan database.
* Tidak mengimplementasikan autentikasi dan otorisasi.
* API Route dibuat untuk simulasi backend.
* Fokus implementasi berada pada routing, SSR, reusable components, form validation, data handling, dan clean architecture sesuai requirement studi kasus.
