import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import SideNav from "../profile/sidenav/SideNav";
import {
  showSuccessMsg,
  showErrMsg,
} from "../../utils/notification/Notification";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const token = useSelector((state) => state.token);

  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const getCategories = async () => {
      const res = await axios.get("/api/category");
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        setSuccess(res.data.msg);
      }
      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setSuccess(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <SideNav />
      <div className="categories">
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className="category_screen">
          <form onSubmit={createCategory}>
            <h4>Category</h4>
            <input
              type="text"
              name="category"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            />

            <button className="category_button" type="submit">
              {onEdit ? "Update" : "Create"}
            </button>
          </form>

          <div className="line-2">
            <hr></hr>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="category_table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>

                    <td>
                      <i
                        className="fas fa-edit"
                        title="Edit"
                        onClick={() =>
                          editCategory(category._id, category.name)
                        }
                      ></i>

                      <i
                        className="fas fa-trash-alt"
                        title="Remove"
                        onClick={() => deleteCategory(category._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
