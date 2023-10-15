"use client"
import { useEffect, useState } from "react";
import { Text, Title, Center, TextInput, Grid, Input,Box } from "@mantine/core";
import { IconSearch } from '@tabler/icons-react';

import BookCard from './components/BookCard'
const API_URL = "https://www.googleapis.com/books/v1/volumes?q="


export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userSearchInput, setUserSearchInput] = useState('');
  const [runSearch, setRunSearch] = useState(false);

  const fetchFromAPI =  async (query : string) => {
    const response = await fetch(API_URL + query)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }

      return response.json()})
    .then((data)=> {
      setSearchData(data.items)
    })
    .catch((error)=> {});
  } 

  useEffect( ()=>{
    setIsClient(true);
    if(userSearchInput !== '')
      fetchFromAPI(userSearchInput);
    setLoading(false);
  }, [runSearch]);

  

  //title = data.volumeInfo.title
  //description data.volumeInfo.description
  //published data.volumeInfo.publishedDate
  return (
  <>
  {loading && <Text>Loading...</Text>}
  {isClient && <>
  <Center>
  <div style={{width:"80%"}}>
  <Center><Title order={1} style={{marginTop: "50px"}}>BookDB</Title></Center>
  <Center>
    <Input  placeholder="Search for any book" 
      style={{width: "80%", textAlign:"center", marginButton:"50px"}} 
      value={userSearchInput} 
      onChange={(event) => setUserSearchInput(event.currentTarget.value)}
      onKeyDown={(event)=>{
        if(event.key == 'Enter'){
          setRunSearch((prev)=> !prev);
        }
      }} 
    />
      
      <IconSearch 
        size={35}
        stroke="{1.5}"
        color="var(--mantine-color-blue-filled)"
        style={{cursor:"pointer"}}
        onClick={()=> setRunSearch((prev)=>!prev)}
        /></Center>

  <Grid style={{marginTop:"20px"}}>
  <Grid.Col span={12}>
  {searchData && searchData.map( (data: any,index: any) => (
   
      <BookCard
        id={data.id}
        bookTitle={data.volumeInfo.title}
        bookDescription={data.volumeInfo.description}
        bookPublishedDate={data.volumeInfo.publishedDate}
        bookImageLinks={data.volumeInfo.imageLinks? data.volumeInfo.imageLinks.thumbnail:"https://books.google.com.br/googlebooks/images/no_cover_thumb.gif" }
        key={data.id} 
      />
    
  ) )} </Grid.Col>
  </Grid>
    
  </div></Center></>}
  
  </>);
}
