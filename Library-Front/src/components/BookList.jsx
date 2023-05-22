
import { useState,useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input, Flex, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react'
import useFetch from '../Hooks/useFetch';
import { HandlePostRequest } from '../Helpers/HandlePostRequest';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel, useDisclosure,


} from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: cats} = useFetch("http://localhost:8080/category")
  const { data: boks} = useFetch("http://localhost:8080/book")
  const [bookList, setBookList] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category:{}
  });
  useEffect(() => {
    if (boks) {
      setBookList(boks);
    }
  }, [boks]);


  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)





  const toast = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const newBook = await HandlePostRequest("http://localhost:8080/book", formData);
      console.log("thisone ",newBook.data)
      setBookList([...bookList, newBook.data]);
      
      onClose();

      setFormData({
        title: '',
        author: '',

      });
      toast({
        title: 'Book Added.',
        description: `Book ${formData.title} has been added successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: 'Server Error.',
        description: "Error:" + err,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })

    }

  }
  const filteredBooks = bookList ? bookList.filter((book) =>
  book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())
) : bookList;
  return (
    <>
      <div id="large-th">
        <div className="cont">
          <h1> A list of books</h1>
          <Flex justify="space-between" m="30">

            <Input type="text" placeholder="Search Book" variant='outline' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} htmlSize={30} width='auto' />
            <Button colorScheme='teal' onClick={onOpen}>New Category <FaPlus style={{ marginLeft: '8px' }} /></Button>
          </Flex>
          <br />

          <div className="choose">
            <a href="#list-th"><i className="fa fa-th-list" aria-hidden="true" /></a>
            <a href="#large-th"><i className="fa fa-th-large" aria-hidden="true" /></a>
          </div>

          <div id="list-th">
            {filteredBooks.map((book) => (
              <div className="book read" key={book.isbn}>
                <Link to={`/book/${book.isbn}`}>
                  <div className="cover">
                    <img src="https://alysbcohen.files.wordpress.com/2015/01/little-princess-book-cover.jpg" alt="rr" />
                  </div>
                  <div className="description">
                    <p className="title">{book.title}<br />
                      <span className="author">{book.author}</span></p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>










      <Modal
        initialFocusRef={initialRef}

        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>New Book</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input placeholder='Title' onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
              </FormControl>
              <FormControl>
                <FormLabel>Author</FormLabel>
                <Input placeholder='Author' onChange={(event) => setFormData({ ...formData, author: event.target.value })} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <AutoComplete openOnFocus onChange={(value) =>setFormData({ ...formData,  category: { ...formData.category, catId: parseInt(value,10) } })}>
                  <AutoCompleteInput variant="outline" placeholder='Select Category'   />
                  <AutoCompleteList>
      
                    {cats && cats.map((cat) => (
                      <AutoCompleteItem 
                        
                        key={cat.catId}
                        value={cat.catId}

                        textTransform="capitalize"
      
                        getValue={(value) => String(value)}
                      >
                        {cat.title}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
              </FormControl>
            </ModalBody>


            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>

  );
}

export default BookList;