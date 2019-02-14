export default {
  register: data => {
    console.log(data.body)
    return {
      success: true,
      username: 'quytm'
    }
  }
}
