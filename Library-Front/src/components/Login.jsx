import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { useState,useEffect } from 'react';
import { HandlePostRequest } from '../Helpers/HandlePostRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [token,setToken] = useState(localStorage.getItem('token'));
   
    const toast = useToast()
    const navigate = useNavigate()
   
    // useEffect(() => {
    //     if(token){
    //         navigate("/")
    //     }
      
    //   }, []);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const token = await HandlePostRequest("http://localhost:8080/admin/login", formData);
            localStorage.setItem("token", token.data.token)
            navigate("/")
            window.location.reload();
            


            toast({
                title: 'Logged In.',
                description: `Welcom Boss!`,
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
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Enter new password
                </Heading>
                <FormControl id="email" isRequired>
                    <FormLabel>UserName</FormLabel>
                    <Input value={formData.username} onChange={(event) => setFormData({ ...formData, username: event.target.value })}
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                    />
                </FormControl>
                <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" value={formData.password} onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    />
                </FormControl>
                <Stack spacing={6}>
                    <Button
                        onClick={handleLogin}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>

    );
}

export default Login;