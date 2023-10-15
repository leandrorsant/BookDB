"use client"
import React, { useEffect } from 'react'

import { Card, Image, Text, Badge, Button, Group, Modal, Alert, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Anchor } from '@mantine/core';

import { useState } from 'react';

import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"

export type bookInfo = {
    id: string,
    bookTitle: string,
    bookDescription: string
    bookPublishedDate: string,
    bookImageLinks: string
}

const bookCard = ({id, bookTitle, bookDescription, bookPublishedDate, bookImageLinks} : bookInfo) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
  <div style={{margin:"10px"}}>
      <Modal  style={{maxWidth:"30%", height:"50px"}} opened={opened} onClose={close} title={bookTitle} centered>
      <div>
        <Image  ref={(node) => {
      if (node) {
        node.style.setProperty("width", "50%", "important");
        node.style.setProperty("margin", "auto", "important");
      }
    }} src={bookImageLinks}></Image>
        <Text style={{fontWeight:"bold"}}>Published date: <span style={{fontWeight:"normal"}}>{bookPublishedDate}</span></Text>
        <br/>
        <Text style={{fontWeight:"bold"}}>Description: <span style={{fontWeight:"normal"}}>{bookDescription? bookDescription : "No description found"}</span></Text>

        </div>
      </Modal>

    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
        <Image ref={(node) => {
            if (node) {
              node.style.setProperty("width", "160px", "important");
              node.style.setProperty("height", "auto", "important");
              node.style.setProperty("margin", "auto", "important");
            }
          }}
          src={bookImageLinks}
          height={160}
          alt={bookTitle}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{bookTitle? bookTitle.length > 30? bookTitle.slice(0,30)+"..." : bookTitle.padEnd(30,"\u00A0") : ""}</Text>
       
      </Group>

      <Text size="sm" c="dimmed">
        {bookDescription? bookDescription.slice(0, 200)+"...": "Found no description"}
      </Text>

      <Center><Button style={{maxWidth:"200px"}} onClick={open} variant="light" color="blue" fullWidth mt="md" radius="md">
        Book Details
      </Button></Center>
    </Card>
    </div>
    
    </>
  );
}

export default bookCard