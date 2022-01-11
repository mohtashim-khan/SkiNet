import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./Lookups.css";
import { Button, Modal } from "react-bootstrap";

const JacketSizeLookup = ({ session }) => {
    const [size, setSizes] = useState(new Map());
    const [deletePrompted, setDeletePrompted] = useState(false);
    const [creationPrompted, setCreatePrompted] = useState(false);

    function getSizes() {
        session.get("sizes").then((resp) => {
            if (resp.status === 200) {
                var updatedSizes = new Map();
                resp.data._embedded.sizes.map((b) => {
                    updatedSizes.set(b.sizeID, {
                        description: b.description,
                        selected: false,
                    });
                });
                setSizes(new Map(updatedSizes));
            }
        });
    }

    useEffect(() => {
        getSizes();
    }, []);

    function promptDeleteOpen() {
        setDeletePrompted(true);
    }

    function promptDeleteCancel() {
        setDeletePrompted(false);
    }

    function promptDeleteExecute() {
        const params = new URLSearchParams();
        size.forEach((v, k) => {
            if (v.selected) {
                params.append("ids", k);
            }
        });
        session
            .delete("lookups/size/deleteInBatch?" + params.toString(), {}, {}, true)
            .then((response) => {
                if (response.status == 200) {
                    getSizes();
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
        const newSizeName = $("#size-name").val();
        session
            .post("sizes", { description: newSizeName }, {}, false)
            .then((response) => {
                if (response.status == 201) {
                    getSizes();
                }
            })
            .catch((e) => {
                console.log(e);
            });
        setCreatePrompted(false);
    }

    return (
        <div class="col-4 p-3">
            <h5>Size</h5>
            <div class="overflow-auto" data-spy="scroll">
                <ul class="list-group scrollableList ">
                    {Array.from(size).map((kv) => {
                        const k = kv[0];
                        const v = kv[1].description;
                        const selected = kv[1].selected;
                        return (
                            <li
                                key={k}
                                onClick={() => {
                                    var selectedBrandItem = size.get(k);
                                    size.set(k, {
                                        description: selectedBrandItem.description,
                                        selected: !selectedBrandItem.selected,
                                    });
                                    setSizes(new Map(size));
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
                        {Array.from(size).map((vk) => {
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
                            <label for="size-name" class="col-form-label">
                                Size:
                            </label>
                            <input type="text" class="form-control" id="size-name" />
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

export default JacketSizeLookup;