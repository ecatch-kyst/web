export function openActionModal(){
    const openModal = !this.state.openModal
    localStorage.setItem("openModal", openModal)
    this.setState({openModal})
    console.log(openModal)
}

export function closeActionModal(){
    const openModal = false
    localStorage.setItem("openModal", openModal)
    this.setState({openModal})
    console.log("Close modal!")
}