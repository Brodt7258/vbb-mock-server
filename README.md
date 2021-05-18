# vbb mock backend
barebones server intended to assist development of the vbb frontend.
allows crud operations on fake json data.
no authentication required for any routes.
changes to the data are not written back to the file, and will not persist between restarts.

## commands

`start`

start up the server

`watch`

start the server, restart any time a file is changed

either command can accept an optional port argument. default is 8000.

## routes

`GET /mentees`

returns all students

also accepts a query param named `q`, this will check the `first_name` and `last_name` properties of all students.
any that contain `q` as a substring will be returned, case insensitive.
Hopefully this will be helpful when building out the searchbar.

`GET /mentees/:id`

return one student with matching id property.

`POST /mentees`

add a new mentee to the array in memory. `id` is autogenerated.
properties _not_ checked for validation. omitting `first_name` or `last_name` will cause a crash when querying.

`PUT /mentees/:id`

update the specified record. same warnings about property validation as above.

`DELETE /mentees/:id`

remove the specified record.