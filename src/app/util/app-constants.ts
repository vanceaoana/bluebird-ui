export class AppConstants {
  public static readonly NEW = 'NEW';
  public static readonly IN_PROGRESS = 'IN_PROGRESS';
  public static readonly IN_REVIEW = 'IN_REVIEW';
  public static readonly DONE = 'DONE';

  public static STATUS_LIST = [
    AppConstants.NEW,
    AppConstants.IN_PROGRESS,
    AppConstants.IN_REVIEW,
    AppConstants.DONE
  ];
}
