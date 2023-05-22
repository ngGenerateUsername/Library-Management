import {
    Heading,
    Avatar,
    Box,

    Image,
    Flex,
    Text,
    Stack,
    Button,

    Spinner,
    Input,

} from '@chakra-ui/react';
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
import useFetch from '../Hooks/useFetch';
import { FaPlus } from 'react-icons/fa';
import { useRef,useEffect, useState } from 'react';
import { HandlePostRequest } from '../Helpers/HandlePostRequest';
import { useToast } from '@chakra-ui/react'
import  axios  from 'axios';
import { Hoc } from '../HOC/hoc';


const Subscribers = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)

    const { data, ispending, err } =  useFetch("http://localhost:8080/subscriber")

    const [subscribers,setSubscribers] = useState(data);
    const [searchTerm, setSearchTerm] = useState("")
    
  
    useEffect(() => {
        if (data) {
        console.log("Litle use effect works")

            setSubscribers(data);
        }
      }, [data]);
      
   
 
    


    const toast = useToast()
    

    const [formData,setFormData] = useState({
        fname:'',
        lname:'',
        address:'',
        expirationDate:''
    })



    //?submit method

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        //setFormData(...formData.expirationDate = new Date(formData.expirationDate).toISOString().slice(0, 10))
        
    
        try {
          const newSubscriber = await HandlePostRequest("http://localhost:8080/subscriber", formData);
          console.log("thisone ",newSubscriber)
          setSubscribers([...subscribers, newSubscriber.data]);
          onClose();
    
          setFormData({
            title: '',
            description: ''
          });
          toast({
            title: 'Category Added.',
            description: `Category ${formData.title} has been added successfully!`,
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


      //? handle delete

      const handleDelete = (id) => {

        axios.delete("http://localhost:8080/subscriber/" + id)
          .then(() => {
    
            toast({
              title: 'Category Deleted.',
              description: "Subscriber has been deleted successfully!",
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            const newSubs = subscribers.filter(sub => sub.cin !== id);
            setSubscribers(newSubs);
    
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
      const filteredSubs = subscribers ? subscribers.filter((sub) =>
      sub.fname && sub.fname.toLowerCase().includes(searchTerm.toLowerCase())
    ) : subscribers;
    return (
        <>
            <h1> Subscribers</h1>
            {ispending &&
                <Flex justify="center" marginTop={200}>
                    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='green.500' size='xl' />
                </Flex>
            }
            {err && <div>{err.message}</div>}


            <Flex justify="space-between" m="30">

                <Input type="text" placeholder="Search Category" variant='outline' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}  htmlSize={30} width='auto' />
                <Button colorScheme='teal' onClick={onOpen} >New Subscriber <FaPlus style={{ marginLeft: '8px' }} /></Button>
            </Flex>



            <Flex wrap="wrap" justify="space-around">
                {filteredSubs && filteredSubs.map((sub) => (
                    <Box
                        key={sub.cin}
                        m={10}
                        maxW={'270px'}
                        w={'full'}
                        bg={new Date(sub.expirationDate) < new Date() ? '#fdbfb5' : 'white'}
                        boxShadow={'2xl'}
                        rounded={'md'}
                        overflow={'hidden'}>
                        <Image
                            h={'120px'}
                            w={'full'}
                            src={
                                'https://i.ibb.co/ns4bb53/t-l-chargement.jpg'
                            }
                            objectFit={'cover'}
                        />
                        <Flex justify={'center'} mt={-12}>
                            <Avatar
                                size={'xl'}
                                src={
                                    `https://api2.rntt.tn/routeicon?ligne=${sub.fname.charAt(0).toUpperCase() + sub.lname.charAt(0).toUpperCase()}&color=6BD098`
                                }
                                alt={'Author'}
                                css={{
                                    border: '2px solid white',
                                }}
                            />
                        </Flex>

                        <Box p={6}>
                            <Stack spacing={0} align={'center'} mb={5}>
                                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                                    {sub.fname}  {sub.lname}
                                </Heading>
                                <Text color={'gray.500'}>{sub.address}</Text>
                            </Stack>

                            <Stack direction={'row'} justify="space-between" spacing={6}>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600} >{sub.expirationDate}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        Expired on

                                    </Text>
                                </Stack>
                                <Stack spacing={0} align={'center'}>
                                    <Text fontWeight={600}>{sub.books ? sub.books.length: 0}</Text>
                                    <Text fontSize={'sm'} color={'gray.500'}>
                                        Books
                                    </Text>
                                </Stack>
                            </Stack>

                            <Button
                                w={'full'}
                                mt={8}
                                bg={'#a51600'}
                                color={'white'}
                                rounded={'md'}
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                                
                            onClick={()=>handleDelete(sub.cin)}
                                >
                                    
                                Delete
                            </Button>
                        </Box>
                    </Box>
                ))}

            </Flex>







            <Modal
                initialFocusRef={initialRef}

                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>New Category</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>

                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input value={formData.fname} onChange={(event) => setFormData({ ...formData, fname: event.target.value })} placeholder='First Name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Last Name</FormLabel>
                                <Input value={formData.lname} onChange={(event) => setFormData({ ...formData, lname: event.target.value })} placeholder='Last Name' />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Address</FormLabel>
                                <Input value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} placeholder='Address' />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Expiration Date</FormLabel>
                                <Input type="date" value={formData.expirationDate} onChange={(event) => setFormData({ ...formData, expirationDate: event.target.value })}  placeholder='Expiration Date' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

        </>
    );
}

export default  Hoc(Subscribers) ;