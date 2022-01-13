import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Lookups.css";
import { Button, Modal } from "react-bootstrap";

const OperationalEventLookup = ({ session }) => {
    const [operationalEvent, setOperationalEvents] = useState(new Map());
    const [deletePrompted, setDeletePrompted] = useState(false);
    const [creationPrompted, setCreatePrompted] = useState(false);

    function getOperationalEvents() {
        session.get("operationalEvents").then((resp) => {
            if (resp.status === 200) {
                var updatedOperationalEvents = new Map();
                resp.data._embedded.operationalEvents.map((b) => {
                    updatedOperationalEvents.set(b.operationalEventID, {
                        description: b.description,
                        selected: false,
                    });
                });
                setOperationalEvents(new Map(updatedOperationalEvents));
            }
        });
    }

    useEffect(() => {
        getOperationalEvents();
    }, []);

    function promptDeleteOpen() {
        setDeletePrompted(true);
    }

    function promptDeleteCancel() {
        setDeletePrompted(false);
    }

    function promptDeleteExecute() {
        const params = new URLSearchParams();
        operationalEvent.forEach((v, k) => {
            if (v.selected) {
                params.append("ids", k);
            }
        });
        session
            .delete("lookups/operationalEvent/deleteInBatch?" + params.toString(), {}, {}, true)
            .then((response) => {
                if (response.status == 200) {
                    getOperationalEvents();
                }
            })
            .catch((e) => {
                console.log(e);
            });
        setDeletePrompted(false);
    }

    function promptCreateOpen() {
        setCreatePrompted(true);
    }

    function promptCreateCancel() {
        setCreatePrompted(false);
    }

    function promptCreateExecute() {
        const newOperationalEventName = $("#operationalEvent-name").val();
        console.log(newOperationalEventName);
        session
            .post("operationalEvents", { description: newOperationalEventName }, {}, false)
            .then((response) => {
                if (response.status == 201) {
                    getOperationalEvents();
                }
            })
            .catch((e) => {
                console.log(e);
            });
        setCreatePrompted(false);
    }

    return (
        <div class="col-4 p-3">
            <h5>Operational Event</h5>
            <div class="overflow-auto" data-spy="scroll">
                <ul class="list-group scrollableList ">
                    {Array.from(operationalEvent).map((kv) => {
                        const k = kv[0];
                        const v = kv[1].description;
                        const selected = kv[1].selected;
                        return (
                            <li
                                key={k}
                                onClick={() => {
                                    var selectedOperationalEventItem = operationalEvent.get(k);
                                    operationalEvent.set(k, {
                                        description: selectedOperationalEventItem.description,
                                        selected: !selectedOperationalEventItem.selected,
                                    });
                                    setOperationalEvents(new Map(operationalEvent));
                                }}
                                className={"list-group-item " + (selected ? "active" : "")}
                            >
                                {v}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div class="d-flex flex-row-reverse mt-1">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={promptDeleteOpen} class="btn btn-danger">
                        Delete
                    </button>
                    <button type="button" onClick={promptCreateOpen} class="btn btn-primary">
                        Add
                    </button>
                </div>
            </div>

            <Modal show={deletePrompted} onHide={promptDeleteCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete these items?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        {Array.from(operationalEvent).map((vk) => {
                            if (vk[1].selected) {
                                return (
                                    <li className="list-group-item" key={vk[0]}>
                                        {vk[1].description}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={promptDeleteExecute}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={promptDeleteCancel}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={creationPrompted} onHide={promptCreateCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a look-up item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-group">
                            <label for="operationalEvent-name" class="col-form-label">
                                Jacket Name:
                            </label>
                            <input type="text" class="form-control" id="operationalEvent-name" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={promptCreateExecute}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={promptCreateCancel}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OperationalEventLookup;
