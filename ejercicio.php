<?php

class Node {
  
    private $key;
  
    private $data;
   
    private $next;
  
    private $previous;
  
    public function __construct($key, $data) {
        $this->key = $key;
        $this->data = $data;
    }
 
    public function setData($data) {
        $this->data = $data;
    }
  
    public function setNext($next) {
        $this->next = $next;
    }

    public function setPrevious($previous) {
        $this->previous = $previous;
    }
    public function getKey() {
        return $this->key;
    }
 
    public function getData() {
        return $this->data;
    }
  
    public function getNext() {
        return $this->next;
    }
  
    public function getPrevious() {
        return $this->previous;
    }
}

class LRUCache {
    private $head;
    private $tail;
    private $capacidad;
    private $hashmap;
    public function __construct($capacidad) {
        $this->hashMap = array();
        $this->head = new Node(null, null);
        $this->tail = new Node(null, null);
        $this->head->setNext($this->tail);
        $this->tail->setPrevious($this->head);
        $this->capacity = $capacidad;
    }
    
    private function attach($head, $node) {
        $node->setPrevious($head);
        $node->setNext($head->getNext());
        $node->getNext()->setPrevious($node);
        $node->getPrevious()->setNext($node);
    }
  
    public function put($key, $data) {
        if ($this->capacity <= 0) { return false; }
        if (isset($this->hashMap[$key]) && !empty($this->hashMap[$key])) {
            $node = $this->hashMap[$key];
            // update data
            $this->detach($node);
            $this->attach($this->head, $node);
            $node->setData($data);
        }
        else {
            $node = new Node($key, $data);
            $this->hashMap[$key] = $node;
            $this->attach($this->head, $node);
            // check if cache is full
            if (count($this->hashMap) > $this->capacity) {
                // we're full, remove the tail
                $nodeToRemove = $this->tail->getPrevious();
                $this->detach($nodeToRemove);
                unset($this->hashMap[$nodeToRemove->getKey()]);
            }
        }
        return true;
    }

    public function get($key) {
        if (!isset($this->hashMap[$key])) { return null; }
        $node = $this->hashMap[$key];
        if (count($this->hashMap) == 1) { return $node->getData(); }
        // refresh the access
        $this->detach($node);
        $this->attach($this->head, $node);
        return $node->getData();
    }
   
   
     public function remove($key) {
       if (!isset($this->hashMap[$key])) { return false; }
       $nodeToRemove = $this->hashMap[$key];
       $this->detach($nodeToRemove);
       unset($this->hashMap[$nodeToRemove->getKey()]);
       return true;
     }
   
 
    
    private function detach($node) {
        $node->getPrevious()->setNext($node->getNext());
        $node->getNext()->setPrevious($node->getPrevious());
    }
}

