export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface ComplaintCreateRequest {
  title: string;
  description: string;
  category: string;
  priority: string;
  createdBy: string;
}

export interface StatusUpdateRequest {
  status: 'Open' | 'In Progress' | 'Resolved';
}

export interface CommentRequest {
  text: string;
  author: string;
}
