import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../../models/comment';
import {CommentService} from '../../../../services/comment/commentService';
import {User} from '../../../user/models/user';
import {UserService} from '../../../../services/user/user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comments-displayer',
  templateUrl: './comments-displayer.component.html',
  styleUrls: ['./comments-displayer.component.css']
})
export class CommentsDisplayerComponent implements OnInit {
  public commentForm: FormGroup;
  //@Input()
  task_id: number = 1;
  commentsList: Comment[] = [];
  commentsWithUsers = [];
  currentUser: User = new User();

  constructor (private commentService: CommentService,
               private userService: UserService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      content: new FormControl()
    });
    this.commentService.getCommentsByTaskId(this.task_id.toString()).subscribe(result => {
      this.commentsList = result;
      this.commentsList.forEach(comment => {
        this.userService.getUserById(comment.user_id.toString()).subscribe(result => {
          this.commentsWithUsers.push(Object.assign({},comment,result));
        })
      });
    });
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  createComment(): void {
    const comment = new Comment();
    comment.content = this.commentForm.controls.content.value;
    const today = new Date();
    comment.create_time = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    comment.task_id = this.task_id;
    comment.user_id = this.currentUser.id;
    this.commentService.createComment(comment).subscribe(result => {
      console.log(result);
      if (result.status === 200) {
        const commentWithUser = Object.assign({},comment,this.currentUser);
        console.log(commentWithUser);
        this.commentsWithUsers.push(commentWithUser);
      }
    });
  }
}
