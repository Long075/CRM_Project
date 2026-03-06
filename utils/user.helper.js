export function dataCreate(){
    const username = "lango" + Date.now();
    return {
        user: {
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
}

export function dataUpdate(username){
    return {
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
}

export function dataInvalid(){
    const username = "lango" + Date.now();
    return [
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
          username: username, // số điện thoại có chữ
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
          username: username, // email không đúng định dạng
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
]}

//Do API không trả về id user nên cần hàm để lấy id user
export async function getIDByUsername(userService, username, token){
    const getUser = await userService.getUsers(token);
    const body2 = await getUser.json();
    const User = (body2.data.users).find(u => u.username === username);
    if (!User) {
        throw new Error(`❌ Không tìm thấy user: ${username}`);
    }
    return User.id;
}