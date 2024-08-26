const Header = ({title}) => {
 // const headerStyle={ inline styling
   // backgroundColor:'mediumblue', 
    // color:'white'}
  return (
     <header>
      <h1> {title} </h1>
     </header>
  )
}
Header.defaultProps={title:"To do List"}
export default Header