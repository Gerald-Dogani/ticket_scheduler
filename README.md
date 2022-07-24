Ticket Scheduler Test Project

There are two type of users. 
1. Role: Admin
2. Role: user

1.1 Ticket Scheduler has provided feature as follow:
1. Sign Up
2. Sign In
3. Forget password
4. Email verification
5. reChaptcha configured
6. Real time statistics for click on page
7. Advertisements 
8. Ticket list 
9. Creating ticket
10. Responsible for mobile
11. Saving data as user, ticket, and date of creation on firestore.
12. Showing chart for total user , ticket

As client side , an user can login and see the list order by the date of creation. Its possible to filter this data by inbound , outbound , start date, end date.

The user can see details of one ticket meanwhile the admin can add another ticket.

Admin can do all things mention at point 1.1 and also he can create/book ticket
On book form are integrated specification as follow:
1. Admin can write inbound , outbound, select ticket type which each ticket has a primary cost and also discount. If flag hasDiscount is activated the calculated value will be patched to price field.
2. Admin can select  from date and also the time.
3. Admin can select to date and also the time.
4. Date from date will put an minimum date for field to date and disable previous date.
5. Date to date will put an maximum date for field from date and disable future date.
6. The admin can add seat number
7. The admin can change price for the ticket but not the price for type of the ticket
8. The ticket type id field will be always disabled and will automatically be created by the ticket type ading and id of ticket creation

Future feature coming soon.....
