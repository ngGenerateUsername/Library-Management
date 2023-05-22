import { Hoc } from "../HOC/hoc";
import useFetch from "../Hooks/useFetch";
import BookList from "./BookList";
import { Flex, Spinner } from '@chakra-ui/react'

const Book = () => {
  const {data : books , ispending,err} = useFetch("http://localhost:8080/book")

    return ( 
      <>
      { books && <BookList books={books}/>}
      {ispending && <Flex justify="center" marginTop={200}>
        <Spinner thickness='4px' speed='0.65s'  emptyColor='gray.200' color='green.500' size='xl'/>
      </Flex>}
      { err && <div>{err}</div>}
      </>

     );
}
 
export default Hoc(Book) ;