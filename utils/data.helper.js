const username = "lango" + Math.random();

export const dataCreate =
  {
    "user": {
      "username": username,
      "name": "LangoHihi",
      "position": "",
      "department_name": "",
      "mobile": "0909123123",
      "email": "long@gmail.com",
      "order": "",
      "note": "",
      "status": "HOAT_DONG",
      "permissions": "danh_muc_khach_hang,danh_muc_hang_hoa,nguoi_su_dung",
      "password": "abc123"
    }
  }

export const dataUpdate =
  {
      user: {
          username: username,
          name: "Lango",
          position: "",
          department_name: "",
          mobile: "0909123123",
          email: "langosiuuu@gmail.com",
          order: "",
          note: "",
          status: "HOAT_DONG",
          permissions: "danh_muc_khach_hang,danh_muc_hang_hoa,nguoi_su_dung",
          password: "abc123"
      }
  }

export const dataInvalid = [
  {
      user: {
          username: 'Hihi', // trùng username
          name: "Lango",
          position: "",
          department_name: "",
          mobile: "0909123123",
          email: "langosiuuu@gmail.com",
          order: "",
          note: "",
          status: "HOAT_DONG",
          permissions: "danh_muc_khach_hang,danh_muc_hang_hoa,nguoi_su_dung",
          password: "abc123"
      }
  },
  {
      user: {
          username: 'Hihi' + Math.random(), // số điện thoại có chữ
          name: "Lango",
          position: "",
          department_name: "",
          mobile: "hihi",
          email: "langosiuuu@gmail.com",
          order: "",
          note: "",
          status: "HOAT_DONG",
          permissions: "danh_muc_khach_hang,danh_muc_hang_hoa,nguoi_su_dung",
          password: "abc123"
      }
  },
  {
      user: {
          username: 'Hihi' + Math.random(), // email không đúng định dạng
          name: "Lango",
          position: "",
          department_name: "",
          mobile: "0909123123",
          email: "langosiuuugmail.com",
          order: "",
          note: "",
          status: "HOAT_DONG",
          permissions: "danh_muc_khach_hang,danh_muc_hang_hoa,nguoi_su_dung",
          password: "abc123"
      }
  },
]