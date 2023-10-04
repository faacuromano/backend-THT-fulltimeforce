export class CommitDTO {
  sha: string;
  message: string;
  authorName: string;
  authorEmail: string;
  commitDate: string;
  treeChanges: string;

  constructor(
    sha: string,
    message: string,
    authorName: string,
    authorEmail: string,
    commitDate: string,
    treeChanges: string,
  ) {
    this.sha = sha;
    this.message = message;
    this.authorName = authorName;
    this.authorEmail = authorEmail;
    this.commitDate = commitDate;
    this.treeChanges = treeChanges;
  }
}
