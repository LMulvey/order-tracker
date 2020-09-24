# Order Tracker
> Track VI Orders, RMAs, Stock, etc.

## New Entry Flow

1) Order or RMA?
2) Region
3) Equipment
4) [IF RMA] -> Which piece of component (L//R CONTROLLER, BASE STATION QUANTITY)
5) [IF RMA] -> Advanced RMA granted?
6) Initiation Date
7) Identifiable information 
8) Proof of Order / RMA
9) Return unique "hash" used to update statuses


## Update entry
1) Input hash
2) Update state - payment? shipped? tracking? received?
3) [IF RMA] - sent? shipped? received? other?
4) Save


### Features

- Update orders within same vicinity
- Provide average order fulfilments
- Provide stats around orders, fulfilment, etc.