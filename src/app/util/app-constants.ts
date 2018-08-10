export class AppConstants {
  public static readonly NEW = 'NEW';
  public static readonly IN_PROGRESS = 'In Progress';
  public static readonly IN_REVIEW = 'In Review';
  public static readonly DONE = 'Done';

  public static STATUS_LIST = [
    AppConstants.NEW,
    AppConstants.IN_PROGRESS,
    AppConstants.IN_REVIEW,
    AppConstants.DONE
  ];
}
