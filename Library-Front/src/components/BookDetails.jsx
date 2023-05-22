import { useParams, useNavigate } from "react-router-dom"
import useFetch from "../Hooks/useFetch";
import { Button, Flex, Stack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Spinner,
    useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react';

import axios from 'axios';
import { Hoc } from "../HOC/hoc";


const BookDetails = () => {
    const { id } = useParams()
    const { data: book, err, ispending } = useFetch("http://localhost:8080/book/" + id)
    const navigate = useNavigate();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const handleDelete = () => {
        axios.delete("http://localhost:8080/book/" + id)
            .then(() => {
                navigate(-1);
                toast({
                    title: 'Book Deleted.',
                    description: "Book has been deleted successfully!",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            })
            .catch(error => {
                toast({
                    title: 'Server Error.',
                    description: "Error:" + error,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            })
    }

    return (

        <>
       {ispending && <Flex justify="center" marginTop={200}>
        <Spinner thickness='4px' speed='0.65s'  emptyColor='gray.200' color='green.500' size='xl'/>
      </Flex>}
            {err && <div>{err}</div>}
            {book &&
                <section className="profile_container">
                    <div className="profile_img_section">
                        <img alt="hmed" className="profile_img-LG" src="https://alysbcohen.files.wordpress.com/2015/01/little-princess-book-cover.jpg" />

                    </div>
                    <div className="profile_desc_section">
                        <h2>{book.title}</h2>
                        <h3>{book.author}</h3>
                        <p className="description">{book.description}</p>
                        <div className="interests">
                            <span className="interests_item">Technology</span>
                            <span className="interests_item">Management</span>
                            <span className="interests_item">Leadership</span>
                        </div>

                    </div>

                </section>

            }
            <Flex justify="center " >
                <Stack direction="row" spacing={4}>
                    <Button variant='outline' colorScheme='green'>Borrow To</Button>
                    <Button variant='outline' colorScheme='red' onClick={onOpen}>Delete</Button>
                </Stack>
            </Flex>



{/* this is the Modal jsx Code */}


            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>

    );
}

export default Hoc(BookDetails) ;