// นำเข้า React และประกาศคอมโพเนนต์
import React from 'react'

export default function FormGet() {
    // สร้าง state สำหรับเก็บผลการค้นหา
    // สร้าง ref สำหรับเก็บข้อมูลฟอร์ม
    let [searchResult, setSearchResult] = React.useState('')
    const form = React.useRef()

    // สร้างฟังก์ชันสำหรับจัดการการส่งฟอร์ม
    const onSubmitForm = (event) => {
        event.preventDefault() // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม

        const formData = new FormData(form.current) // สร้าง FormData จากฟอร์มที่ส่งมา
        let params = new URLSearchParams(formData) // แปลง form data ให้เป็น query string
        let URL = '/api/form-get?' + params // สร้าง URL สำหรับเรียก API โดยใช้ query string ที่ได้จาก form data

        fetch(URL) // ส่งคำขอ GET ไปยัง API ที่กำหนด
            .then(response => response.json()) // แปลงข้อมูลที่ได้รับจาก server เป็น JSON
            // เมื่อได้รับข้อมูลจาก server ให้ทำการสร้าง JSX element ที่แสดงผลลัพธ์การค้นหา
            .then(result => {
                let r = (
                    <>
                        ค้นหา {result.target} ที่ตรงกับ: {result.kw} <br />
                        พบข้อมูลทั้งหมด: {result.results} รายการ
                    </>
                )
                setSearchResult(r)
            })
            .catch(err => alert(err)) // ถ้ามีข้อผิดพลาดเกิดขึ้น ให้แสดงข้อความเตือน
    }

    // ฟังก์ชันนี้จะทำงานเมื่อคอมโพเนนต์ถูกเรนเดอร์ หรืออัปเดต JSX สำหรับแสดงผล
    return (
        <div className="border p-3 mb-3 w-50 mx-auto text-center">
            <h3>Form GET-API</h3><br></br>
            <form ref={form} onSubmit={onSubmitForm}>
                <label>ค้นหา:</label>&nbsp;
                <select id="target" name="target">
                    <option value="เว็บ">เว็บ</option>
                    <option value="รูปภาพ">รูปภาพ</option>
                    <option value="วิดีโอ">วิดีโอ</option>
                </select>&nbsp;
                <input type="text" id="kw" name="kw" />&nbsp;
                <button>ตกลง</button>
            </form>
            <br />
            <div>{searchResult}</div>
        </div>
    )
}