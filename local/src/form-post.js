// Import และสร้าง component FormPost
import React from 'react'

export default function FormPost() {
    // สร้าง state postedData ใช้เก็บผลลัพธ์ที่ส่งกลับมาจาก API
    // ใช้ useRef() เพื่ออ้างอิงถึง DOM ของฟอร์ม
    let [postedData, setPostedData] = React.useState('')
    const form = React.useRef()

    // สร้างฟังก์ชัน onSubmitForm เพื่อจัดการการส่งฟอร์ม
    const onSubmitForm = (event) => {
        event.preventDefault() // หยุดการส่งฟอร์มแบบปกติ

        const formData = new FormData(form.current) // สร้าง FormData จากฟอร์มที่อ้างอิง
        const formEnt = Object.fromEntries(formData.entries()) // แปลง FormData เป็น Object
       
        // ส่งข้อมูลฟอร์มไปยัง API โดยใช้ fetch
        fetch('/api/form-post', {
            method: 'POST',
            body: JSON.stringify(formEnt), 
            headers: {'Content-Type':'application/json'} // บอกเซิร์ฟเวอร์ว่าข้อมูลเป็น JSON
        })
        .then(response => response.text()) // แปลงข้อมูลที่ตอบกลับเป็นข้อความ
        .then(result => setPostedData(result)) // ตั้งค่า state postedData ด้วยผลลัพธ์ที่ได้
        .catch(err => alert(err)) // ถ้ามีข้อผิดพลาดให้แสดงข้อความเตือน
    }

    const inputStyle = {
        margin: '5px 0',
    }

    return (
    <div style={{margin:'30px'}}>
        <form ref={form} onSubmit={onSubmitForm}>
            <div>ติดต่อเรา</div>
            <input type="text" name="name" size="43" placeholder="ชื่อ" style={inputStyle} /><br/>
            <input type="email" name="email" size="43" placeholder="อีเมล" style={inputStyle}/><br/>
            <textarea name="message" cols="40" rows="4" placeholder="ข้อความ" style={inputStyle}></textarea><br/>
            <button>ตกลง</button>
        </form>
        <br/>
        <div dangerouslySetInnerHTML={{__html: postedData}}></div> {/* // แสดงผลลัพธ์ที่ส่งกลับจาก API โดยใช้ dangerouslySetInnerHTML */}
    </div>
    )
}