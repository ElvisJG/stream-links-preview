const listNode = (value, prev = null, next = null) => {
  let v = value;

  const insert_after = v => {
    let current_next = next;
    next = listNode(v, current_next);
    if (current_next) {
      current_next.prev = next;
    }
  };

  const insert_before = v => {
    let current_prev = prev;
    prev = listNode(v, current_prev);
    if (current_prev) {
      current_prev.next = prev;
    }
  };

  const remove = () => {
    if (prev) {
      prev.next = next;
    } else if (next) {
      next.prev = prev;
    }
  };

  return {
    insert_after,
    insert_before,
    remove
  };
};

const DoublyLinkedList = (node = null) => {
  let head = node;
  let tail = node;
  let length = node ? 1 : 0;

  const __len__ = () => {
    return length;
  };

  const add_to_head = v => {
    let new_node = listNode(v, null, null);
    length += 1;
    if (!head && !tail) {
      head = new_node;
      tail = new_node;
    } else {
      new_node.next = head;
      head.prev = new_node;
      head = new_node;
    }
  };

  const remove_from_head = () => {
    let value = head.value;
    remove(head);
    return value;
  };

  const add_to_tail = v => {
    let new_node = listNode(v, null, null);
    length += 1;
    if (!head && !tail) {
      head = new_node;
      tail = new_node;
    } else {
      new_node.prev = tail;
      tail.next = new_node;
      tail = new_node;
    }
  };

  const remove_from_tail = () => {
    let value = tail.value;
    remove(tail);
    return value;
  };

  const move_to_front = node => {
    if (node == head) {
      return;
    }
    let value = node.value;
    remove(node);
    add_to_head(value);
  };

  const move_to_end = node => {
    if (node == tail) {
      return;
    }
    let value = node.value;
    remove(node);
    add_to_tail(value);
  };

  const remove = node => {
    length -= 1;
    if (head == tail) {
      head = null;
      tail = null;
    } else if (head === node) {
      head = node.next;
      node.remove();
    } else if (tail === node) {
      tail = node.prev;
      node.remove();
    } else {
      node.remove();
    }
  };

  const max = () => {
    let max_value = head.value;
    let current = head;
    while (current !== null) {
      if (current.value > max_value) {
        max_value = current.value;
      }
      current = current.next;
    }
    return max_value;
  };

  return {
    __len__,
    add_to_head,
    remove_from_head,
    add_to_tail,
    remove_from_tail,
    move_to_front,
    move_to_end,
    remove,
    max
  };
};
export const RingBuffer = capacity => {
  let cap = capacity;
  let storage = DoublyLinkedList();
  let len = storage.__len__();
  console.log(len);
  console.log(cap);

  const append = item => {
    if (len < cap) {
      storage.add_to_tail(item);
      current = storage.head;
    } else {
      current.value = item;
      current = current.next || storage.head;
    }
  };

  const get = () => {
    let contents = [];
    let iterable = storage.head;
    while (iterable !== null) {
      contents.push(iterable.value);
      iterable = iterable.next;
    }
    return contents;
  };

  return {
    append,
    get
  };
};
